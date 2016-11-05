/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Layout from '../../components/Layout';
import ProjectsList from '../../components/ProjectsList';
import ActivityLog from '../../components/ActivityLog';
import ProjectPane from '../../components/ProjectPane';
import {getUser} from '../../core/reducers/auth';
import {getProjects} from '../../core/reducers/projects';
import {setCurrentProjectId} from '../../core/reducers/ui';

@connect((state) => ({
  uid: state.auth.user && state.auth.user.uid,
  projects: state.projects,
  currentProjectId: state.ui.currentProjectId,
}), {
  getUser,
  getProjects,
  setCurrentProjectId,
})
class HomePage extends React.Component {

  static propTypes = {
    uid: PropTypes.string,
    getUser: PropTypes.func,
    getProjects: PropTypes.func,
    currentProjectId: PropTypes.string,
    setCurrentProjectId: PropTypes.func,
  };

  componentWillMount() {
    this.props.getUser();
  }

  componentWillReceiveProps(nextProps) {
    const {uid: thisUid} = this.props;
    const {uid: nextUid, projects, currentProjectId} = nextProps;
    // load projects of current user
    if (nextUid && nextUid !== thisUid) {
      this.props.getProjects(nextUid);
    }
    // initially select arbitrary project
    if (!currentProjectId && projects !== {}) {
      const firstProject = Object.keys(projects)[0];
      this.props.setCurrentProjectId(firstProject);
    }
  }

  render() {
    return (
      <Layout>
        <ProjectsList/>
        <ProjectPane/>
        <ActivityLog/>
      </Layout>
    );
  }

}

export default HomePage;
