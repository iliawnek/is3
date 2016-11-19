import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Drawer from '../Drawer';
import Button from '../Button';
import {setCurrentProjectId, closeProjectsList} from '../../core/reducers/ui';
import {createProject} from '../../core/reducers/projects';
import arrow from './arrow.png';

@connect(state => ({
  uid: state.auth.user && state.auth.user.uid,
  projectsListOpen: state.ui.projectsListOpen,
  projects: state.projects,
  currentProjectId: state.ui.currentProjectId,
}), {
  closeProjectsList,
})

export default class ProjectsList extends Component {
  static propTypes = {
    projectsListOpen: PropTypes.bool,
    closeProjectsList: PropTypes.func,
    uid: PropTypes.string,
  };

  handleCreateProject = () => {
    const newProjectId = createProject(this.props.uid);
    setCurrentProjectId(this.props.uid, newProjectId);
    this.props.closeProjectsList();
  };

  handleProjectSelection = (projectId) => {
    setCurrentProjectId(this.props.uid, projectId);
    this.props.closeProjectsList();
  };

  render() {
    const {projectsListOpen, projects, currentProjectId, uid} = this.props;

    const styles = {
      drawer: {
        display: 'flex',
        flexDirection: 'column',
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 80,
        width: '100%',
        alignItems: 'center',
      },
      title: {
        fontSize: 32,
        marginLeft: 24,
      },
      createButton: {
        backgroundColor: 'transparent',
        height: 80,
        width: 80,
      },
      createIcon: {
        fill: 'black',
      },
      projectsListButton: {
        display: 'flex',
        width: '100%',
        backgroundColor: 'transparent',
        color: '#444',
        justifyContent: 'space-between',
      },
      arrow: {
        position: 'absolute',
        width: 100,
        marginTop: 0,
        marginLeft: 305,
        transform: 'scaleX(-1)',
      },
      helpText: {
        position: 'absolute',
        top: 128,
        left: 125,
        width: 160,
        height: 200,
        lineHeight: 1.5,
        fontSize: 14,
        textAlign: 'right',
      },
    };

    const createProjectButton = (
      <Button
        data-tip="Create a new project"
        data-for="create-project"
        onClick={this.handleCreateProject}
        style={styles.createButton}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path style={styles.createIcon} d="M 11 0L 9 0L 9 9L 0 9L 0 11L 9 11L 9 20L 11 20L 11 11L 20 11L 20 9L 11 9L 11 0Z"/>/>
        </svg>
      </Button>
    );

    const projectsList = Object.keys(projects).filter(projectId => (projectId !== 'collaborators') && (projectId !== 'addCollaboratorFlags'))
      .map(projectId => {
        if (!projects[projectId]) return null;
        return (
          <Button
            style={styles.projectsListButton}
            key={projectId}
            selected={projectId === currentProjectId}
            onClick={this.handleProjectSelection.bind(this, projectId)}
          >
            {projects[projectId].title || 'New project'}
          </Button>
        )
    }).filter(item => item !== null);

    console.log(projectsList);

    return (
      <Drawer
        open={projectsListOpen}
        style={styles.drawer}
        side="left"
        onClickOutside={this.props.closeProjectsList}
      >
        <div style={styles.header}>
          <span style={styles.title}>PROJECTS</span>
          {createProjectButton}
        </div>
        {projectsList}
        <ReactTooltip id="create-project" place="right" effect="solid"/>
        {projectsList.length === 0 && <div>
          <img src={arrow} style={styles.arrow}/>
          <div style={styles.helpText}>
            Click here to<br/>create a new project.
          </div>
        </div>}
      </Drawer>
    );
  }
}
