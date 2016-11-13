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
import {getCurrentProjectId} from '../../core/reducers/ui';

@connect((state) => ({
  user: state.auth.user,
  projects: state.projects,
  currentProjectId: state.ui.currentProjectId,
}), {
  getUser,
  getProjects,
  getCurrentProjectId,
})
class HomePage extends React.Component {

  static propTypes = {
    user: PropTypes.object,
    getUser: PropTypes.func,
    getProjects: PropTypes.func,
    currentProjectId: PropTypes.string,
    getCurrentProjectId: PropTypes.func,
  };

  componentWillMount() {
    if (!this.props.user) {
      this.props.getUser();
    }
  }

  componentWillReceiveProps(nextProps) {
    const {user: thisUser} = this.props;
    const {user: nextUser} = nextProps;
    if (nextUser && (!thisUser || nextUser.uid !== thisUser.uid)) {
      this.props.getProjects(nextUser.uid);
      this.props.getCurrentProjectId(nextUser.uid);
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
