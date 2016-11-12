import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Card from '../Card';
import Firebase from 'firebase';

@connect(state => ({user: state.auth.user}))
export default class TextCard extends Component {
  static propTypes = {
    card: PropTypes.object,
    user: PropTypes.object,
  };

  componentDidMount() {
    const {card, user} = this.props;

    const titleRef = Firebase.database().ref(`cards/${card.projectId}/${card.id}/title`);
    const titleCodeMirror = CodeMirror(this.titleDiv, {lineWrapping: true, viewportMargin: Infinity, placeholder: "Text card title"});
    Firepad.fromCodeMirror(titleRef, titleCodeMirror, {
      userId: user.uid,
    });

    const textRef = Firebase.database().ref(`cards/${card.projectId}/${card.id}/text`);
    const textCodeMirror = CodeMirror(this.textDiv, {lineWrapping: true, viewportMargin: Infinity, placeholder: "Start typing here..."});
    Firepad.fromCodeMirror(textRef, textCodeMirror, {
      richTextShortcuts: true,
      userId: user.uid,
    });
  }

  textDiv;
  titleDiv;

  render() {
    const {...otherProps} = this.props;

    const styles = {
      card: {
        flexDirection: 'column',
        width: 350,
        boxSizing: 'border-box',
      },
      title: {
        fontSize: 24,
        height: 36,
      },
      text: {
        marginTop: 24,
        height: 242,
      },
    };

    return (
      <Card style={styles.card} {...otherProps}>
        <div style={styles.title} className="Firepad-title" ref={(div) => {
          this.titleDiv = div;
        }}/>
        <div style={styles.text} className="Firepad-text" ref={(div) => {
          this.textDiv = div;
        }}/>
      </Card>
    );
  }
}
