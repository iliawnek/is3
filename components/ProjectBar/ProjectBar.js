import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Avatar from '../Avatar';
import Button from '../Button';
import ReactTooltip from 'react-tooltip';

@connect(state => ({
  collaborators: state.projects.collaborators,
}))
export default class ProjectBar extends Component {
  static propTypes = {
    collaboratorIds: PropTypes.array,
    collaborators: PropTypes.object,
    style: PropTypes.object,
    onDelete: PropTypes.func,
  };

  render() {
    const {collaborators, collaboratorIds, onDelete, style} = this.props;

    const styles = {
      list: {
        display: 'flex',
        alignItems: 'center',
        ...style,
      },
      avatar: {
        marginLeft: 4,
        marginRight: 4,
      },
      button: {
        height: 40,
        width: 40,
        fontSize: 14,
        fontWeight: 400,
        padding: 0,
        backgroundColor: 'transparent',
      },
      divider: {
        width: 1,
        backgroundColor: '#ccc',
        marginLeft: 10,
        height: 40,
      },
      icon: {
        fill: '#888',
      }
    };

    const deleteButton = (
      <Button
        style={styles.button}
        data-for="delete"
        data-tip="Delete this project"
      >
        <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
          <path style={styles.icon} d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
      </Button>
    );

    const addCollaboratorButton = (
      <Button
        style={styles.button}
        data-for="add-collaborator"
        data-tip="Add a collaborator"
      >
        <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
          <path style={styles.icon} d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </Button>
    );

    return (
      <div style={styles.list}>
        {collaboratorIds && collaborators && collaboratorIds.map(uid => (
          collaborators[uid] && <Avatar
            key={uid}
            image={collaborators[uid].photo}
            tooltip={`${collaborators[uid].name} (${collaborators[uid].email})`}
            style={styles.avatar}/>
        ))}
        <div style={styles.divider}/>
        {addCollaboratorButton}
        {deleteButton}
        <ReactTooltip id="delete" place="bottom" effect="solid"/>
        <ReactTooltip id="add-collaborator" place="bottom" effect="solid"/>
      </div>
    );
  }
}
