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

    // Get Firebase Database reference.
    const firepadRef = Firebase.database().ref(`cards/${card.projectId}/${card.id}/firepad`);

    // Create CodeMirror (with lineWrapping on).
    const codeMirror = CodeMirror(this.textDiv, {lineWrapping: true});

    // Create Firepad (with rich text toolbar and shortcuts enabled).
    const firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
      richTextShortcuts: true,
      userId: user.uid,
      defaultText: 'Start typing here...'
    });
  }

  textDiv;

  render() {
    const {card, ...otherProps} = this.props;

    const styles = {
      card: {
        flexDirection: 'column',
        width: 350,
        boxSizing: 'border-box',
      },
      title: {
        fontSize: 24,
      },
      text: {
        fontSize: 16,
        color: '#444',
        marginTop: 24,
        height: 250,
      },
    };

    return (
      <Card style={styles.card} {...otherProps}>
        <div style={styles.title}>{card.title}</div>
        <div style={styles.text} ref={(text) => {
          this.textDiv = text;
        }}/>
      </Card>
    );
  }
}
