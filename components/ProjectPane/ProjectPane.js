import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(state => ({
  projects: state.projects,
  currentProjectId: state.ui.currentProjectId,
}), {

})

export default class ProjectPane extends Component {
  static propTypes = {
    currentProjectId: PropTypes.string,
  };

  state = {
    currentProject: null,
  };

  componentWillReceiveProps(nextProps) {
    const {currentProjectId: thisCurrentProjectId, projects} = this.props;
    const {currentProjectId: nextCurrentProjectId} = nextProps;
    if (projects && nextCurrentProjectId && nextCurrentProjectId !== thisCurrentProjectId) {
      this.setState({
        currentProject: projects[nextCurrentProjectId],
      });
    }
  }

  render() {
    const {currentProject} = this.state;

    const styles = {
      projectPane: {
        maxWidth: 934,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 50,
      },
      projectName: {
        fontSize: 32,
      }
    };

    return (
      <div style={styles.projectPane}>
        <span style={styles.projectName}>{currentProject && currentProject.name.toUpperCase()}</span>
      </div>
    );
  }
}
