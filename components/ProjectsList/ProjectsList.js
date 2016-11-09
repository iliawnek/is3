import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Drawer from '../Drawer';
import Button from '../Button';
import {setCurrentProjectId, closeProjectsList} from '../../core/reducers/ui';

@connect(state => ({
  projectsListOpen: state.ui.projectsListOpen,
  projects: state.projects,
  currentProjectId: state.ui.currentProjectId,
}), {
  setCurrentProjectId,
  closeProjectsList,
})

export default class ProjectsList extends Component {
  static propTypes = {
    projectsListOpen: PropTypes.bool,
    setCurrentProjectId: PropTypes.func,
    closeProjectsList: PropTypes.func,
  };

  render() {
    const {projectsListOpen, projects, currentProjectId, setCurrentProjectId} = this.props;

    const styles = {
      drawer: {
        display: 'flex',
        flexDirection: 'column',
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        height: 60,
        width: '100%',
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        marginLeft: 24,
      },
      createButton: {
        backgroundColor: 'transparent',
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
      }
    };

    const createProjectButton = (
      <Button
        onClick={() => {console.log("create new project");}}
        style={styles.createButton}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path style={styles.createIcon} d="M 11 0L 9 0L 9 9L 0 9L 0 11L 9 11L 9 20L 11 20L 11 11L 20 11L 20 9L 11 9L 11 0Z"/>/>
        </svg>
      </Button>
    );

    const projectsList = Object.keys(projects).map(projectId => {
      return (
        <Button
          style={styles.projectsListButton}
          key={projectId}
          selected={projectId === currentProjectId}
          onClick={setCurrentProjectId.bind(this, projectId)}
        >
          {projects[projectId].name.toUpperCase()}
        </Button>
      )
    });

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
      </Drawer>
    );
  }
}
