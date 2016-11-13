import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Avatar from '../Avatar';

@connect(state => ({
  collaborators: state.projects.collaborators,
}))
export default class CollaboratorList extends Component {
  static propTypes = {
    collaboratorIds: PropTypes.array,
    collaborators: PropTypes.object,
    style: PropTypes.object,
  };

  render() {
    const {collaborators, collaboratorIds, style} = this.props;

    const styles = {
      list: {
        display: 'flex',
        ...style,
      },
      avatar: {
        marginLeft: 4,
        marginRight: 4,
      },
    };

    return (
      <div style={styles.list}>
        {collaboratorIds && collaborators && collaboratorIds.map(uid => (
          collaborators[uid] && <Avatar
            key={uid}
            image={collaborators[uid].photo}
            tooltip={collaborators[uid].name}
            style={styles.avatar}/>
        ))}
      </div>
    );
  }
}
