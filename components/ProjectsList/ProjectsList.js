import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Drawer from '../Drawer';
import Button from '../Button';

@connect(state => ({
  projectsListOpen: state.ui.projectsListOpen,
}), {})

export default class ProjectsList extends Component {
  static propTypes = {
    projectsListOpen: PropTypes.bool,
  };

  render() {
    const {projectsListOpen} = this.props;

    const styles = {
      drawer: {

      },
      header: {
        justifyContent: 'space-between',
        height: 60,
        width: '100%',
        alignItems: 'center',
      },
      title: {
        fontSize: 20,
        marginLeft: 24,
      },
      createButton: {
        backgroundColor: 'transparent',
      },
      createIcon: {
        fill: 'black',
      }
    };

    return (
      <Drawer
        open={projectsListOpen}
        style={styles.drawer}
        side="left"
      >
        <div style={styles.header}>
          <span style={styles.title}>PROJECTS</span>
          <Button
            onClick={() => {console.log("create new project");}}
            style={styles.createButton}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path style={styles.createIcon} d="M 11 0L 9 0L 9 9L 0 9L 0 11L 9 11L 9 20L 11 20L 11 11L 20 11L 20 9L 11 9L 11 0Z"/>/>
            </svg>
          </Button>
        </div>
      </Drawer>
    );
  }
}
