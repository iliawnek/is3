import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Drawer from '../Drawer';

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

      }
    };

    return (
      <Drawer
        open={projectsListOpen}
        style={styles.drawer}
        side="left"
      >

      </Drawer>
    );
  }
}
