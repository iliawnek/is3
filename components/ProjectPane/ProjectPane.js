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

    return (
      <div>
        {currentProject && currentProject.name}
      </div>
    );
  }
}
