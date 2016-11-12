import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Card from '../Card';
import Firebase from 'firebase';
import {changeCardTitle} from '../../core/reducers/projects';

@connect(state => ({user: state.auth.user}))
export default class TextCard extends Component {
  static propTypes = {
    card: PropTypes.object,
    user: PropTypes.object,
  };

  componentDidMount() {
    const {card, user} = this.props;

    const textRef = Firebase.database().ref(`firepad/${card.id}`);
    const textCodeMirror = CodeMirror(this.textDiv, {lineWrapping: true, viewportMargin: Infinity, placeholder: "Start typing here..."});
    Firepad.fromCodeMirror(textRef, textCodeMirror, {
      richTextShortcuts: true,
      userId: user.uid,
    });
  }

  textDiv;

  handleTitleChange = (event) => {
    if (event.target.value !== this.props.card.title) {
      changeCardTitle(this.props.card, event.target.value);
    }
  };

  render() {
    const {card, ...otherProps} = this.props;

    const styles = {
      card: {
        flexDirection: 'column',
        width: 350,
        boxSizing: 'border-box',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        height: 36,
        fontFamily: 'Montserrat, sans-serif',
        outline: 'none',
        border: 'none',
        textOverflow: 'ellipsis',
        width: '100%',
      },
      text: {
        marginTop: 8,
        height: 242,
      },
    };

    return (
      <Card style={styles.card} {...otherProps}>
        <input
          style={styles.title}
          onChange={this.handleTitleChange}
          value={card.title}
          placeholder="New text card"
        />
        <div style={styles.text} className="Firepad-text" ref={(div) => {
          this.textDiv = div;
        }}/>
      </Card>
    );
  }
}
