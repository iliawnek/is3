import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Card from '../Card';
import Button from '../Button';
import Firebase from 'firebase';
import {changeCardTitle, deleteCard} from '../../core/reducers/projects';

@connect(state => ({user: state.auth.user}))
export default class TextCard extends Component {
  static propTypes = {
    card: PropTypes.object,
    user: PropTypes.object,
  };

  componentDidMount() {
    const {card, user} = this.props;

    const textRef = Firebase.database().ref(`firepad/${card.id}`);
    const textCodeMirror = CodeMirror(this.textDiv, {
      lineWrapping: true,
      viewportMargin: Infinity,
      placeholder: "Start typing here..."
    });
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
        boxSizing: 'border-box',
      },
      header: {
        width: '100%',
        display: 'flex',

      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        height: 36,
        fontFamily: 'Montserrat, sans-serif',
        outline: 'none',
        border: 'none',
        textOverflow: 'ellipsis',
        width: 'calc(100% - 40px)',
      },
      text: {
        marginTop: 8,
        height: 242,
      },
      closeButton: {
        padding: 0,
        backgroundColor: 'transparent',
        width: 40,
        height: 40,
      },
      closeIcon: {
        fill: '#ccc'
      },
    };

    const closeButton = (
      <Button
        style={styles.closeButton}
        onClick={deleteCard.bind(this, card)}
      >
        <svg style={styles.closeIcon} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </Button>
    );

    return (
      <Card style={styles.card} {...otherProps}>
        <div style={styles.header}>
          <input
            style={styles.title}
            onChange={this.handleTitleChange}
            value={card.title}
            placeholder="New text card"
          />
          {closeButton}
        </div>
        <div style={styles.text} className="Firepad-text" ref={(div) => {
          this.textDiv = div;
        }}/>
      </Card>
    );
  }
}
