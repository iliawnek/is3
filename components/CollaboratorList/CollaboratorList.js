import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Firebase from 'firebase';
import Avatar from '../Avatar';

export default class CollaboratorList extends Component {
  static propTypes = {
    collaborators: PropTypes.object,
  };

  state = {
    collaborators: null,
  };

  render() {
    const {collaborators} = this.state;

    const styles = {
      list: {
        display: 'flex',
      }
    };

    return (
      <div style={styles.list}>
        {collaborators && collaborators.map(collaborator => (
          <Avatar image={collaborator.photoURL} style={styles.avatar}/>
        ))}
      </div>
    );
  }
}
