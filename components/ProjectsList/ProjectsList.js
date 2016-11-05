import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Drawer from '../Drawer';
import Button from '../Button';

@connect(state => ({
  projectsListOpen: state.ui.projectsListOpen,
  projects: state.projects,
}), {})

export default class ProjectsList extends Component {
  static propTypes = {
    projectsListOpen: PropTypes.bool,
  };

  render() {
    const {projectsListOpen, projects} = this.props;

    const styles = {
      drawer: {
        flexDirection: 'column',
      },
      header: {
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
        <Button style={styles.projectsListButton} key={projectId}>
          {projects[projectId].name}
        </Button>
      )
    });

    return (
      <Drawer
        open={projectsListOpen}
        style={styles.drawer}
        side="left"
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
