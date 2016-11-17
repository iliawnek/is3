import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Avatar from '../Avatar';
import Button from '../Button';
import Modal from '../Modal';
import ReactTooltip from 'react-tooltip';
import {
  openAddCollaboratorModal,
  closeAddCollaboratorModal,
  openDeleteProjectModal,
  closeDeleteProjectModal,
  openProjectsList,
} from '../../core/reducers/ui';
import {addCollaborator, resetAddCollaboratorFlags, deleteProject} from '../../core/reducers/projects';

@connect(state => ({
  collaborators: state.projects.collaborators,
  addCollaboratorModalOpen: state.ui.addCollaboratorModalOpen,
  deleteProjectModalOpen: state.ui.deleteProjectModalOpen,
  addCollaboratorFlags: state.projects.addCollaboratorFlags,
}), {
  openAddCollaboratorModal,
  closeAddCollaboratorModal,
  openDeleteProjectModal,
  closeDeleteProjectModal,
  addCollaborator,
  resetAddCollaboratorFlags,
  openProjectsList,
})
export default class ProjectBar extends Component {
  static propTypes = {
    collaboratorIds: PropTypes.array,
    collaborators: PropTypes.object,
    style: PropTypes.object,
    openAddCollaboratorModal: PropTypes.func,
    closeAddCollaboratorModal: PropTypes.func,
    openDeleteProjectModal: PropTypes.func,
    closeDeleteProjectModal: PropTypes.func,
    addCollaboratorModalOpen: PropTypes.bool,
    deleteProjectModalOpen: PropTypes.bool,
    project: PropTypes.object,
    addCollaborator: PropTypes.func,
    addCollaboratorFlags: PropTypes.object,
    resetAddCollaboratorFlags: PropTypes.func,
    openProjectsList: PropTypes.func,
  };

  state = {
    email: '',
    emailValid: false,
  };

  handleEmailFieldChange = (event) => {
    const {value} = event.target;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({
      email: value,
      emailValid: re.test(value),
    });
    this.props.resetAddCollaboratorFlags();
  };

  handleInvite = () => {
    const {email} = this.state;
    const {project} = this.props;
    this.props.addCollaborator(email, project.id);
  };

  handleCloseAddCollaboratorModal = () => {
    this.props.closeAddCollaboratorModal();
    this.props.resetAddCollaboratorFlags();
    this.setState({email: ''});
  };

  handleDelete = () => {
    deleteProject(this.props.project);
    this.props.closeDeleteProjectModal();
    this.props.openProjectsList();
  };

  componentWillReceiveProps(nextProps) {
    if ((nextProps.addCollaboratorFlags.success !== this.props.addCollaboratorFlags.success) && nextProps.addCollaboratorFlags.success) {
      this.setState({email: ''});
    }
  }

  render() {
    const {
      collaborators,
      collaboratorIds,
      style,
      openAddCollaboratorModal,
      openDeleteProjectModal,
      closeDeleteProjectModal,
      addCollaboratorModalOpen,
      deleteProjectModalOpen,
      addCollaboratorFlags,
      project,
    } = this.props;

    const {
      email,
      emailValid,
    } = this.state;

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
      },
      emailField: {
        fontSize: 16,
        fontFamily: 'Montserrat, sans-serif',
        height: 60,
        outline: 'none',
        border: 'none',
        padding: 16,
        boxSizing: 'border-box',
        textOverflow: 'ellipsis',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        marginBottom: 32,
      },
      inviteButtonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      deleteButtonContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        marginTop: 32,
      },
      inviteButton: {
        width: 80,
        backgroundColor: emailValid ? '#16B219' : 'rgba(0,0,0,0.08)',
        transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
        color: emailValid ? 'white' : '#aaa',
        height: 48,
      },
      deleteButton: {
        height: 48,
      },
    };

    const deleteButton = (
      <Button
        style={styles.button}
        data-for="delete"
        data-tip="Delete this project"
        onClick={openDeleteProjectModal}
      >
        <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
          <path style={styles.icon} d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
      </Button>
    );

    const deleteModal = (
      <Modal
        open={deleteProjectModalOpen}
        onClickOutside={closeDeleteProjectModal}
        title="DELETE PROJECT?"
      >
        Are you sure you want to delete <span style={{whiteSpace: 'nowrap', fontWeight: 'bold'}}>
          {project.title ? project.title : 'New project'}
        </span>?
        <div style={styles.deleteButtonContainer}>
          <Button style={styles.deleteButton} onClick={this.handleDelete}>
            DELETE
          </Button>
        </div>
      </Modal>
    );

    const collaboratorButton = (
      <Button
        style={styles.button}
        data-for="add-collaborator"
        data-tip="Add a collaborator"
        onClick={openAddCollaboratorModal}
      >
        <svg height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
          <path style={styles.icon} d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </Button>
    );

    const collaboratorModal = (
      <Modal
        open={addCollaboratorModalOpen}
        onClickOutside={this.handleCloseAddCollaboratorModal}
        title="ADD A COLLABORATOR"
      >
        <input
          style={styles.emailField}
          onChange={this.handleEmailFieldChange}
          value={email}
          placeholder="Enter an email address..."
        />
        <div style={styles.inviteButtonContainer}>
          <div>
            {addCollaboratorFlags.success && 'User has been successfully added.'}
            {addCollaboratorFlags.failure && 'User was not found.'}
          </div>
          <Button style={styles.inviteButton} onClick={this.handleInvite}>
            ADD
          </Button>
        </div>
      </Modal>
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
        {collaboratorButton}
        {collaboratorModal}
        {deleteButton}
        {deleteModal}
        <ReactTooltip id="delete" place="bottom" effect="solid"/>
        <ReactTooltip id="add-collaborator" place="bottom" effect="solid"/>
      </div>
    );
  }
}
