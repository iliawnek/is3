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
import {getUser} from '../../core/reducers/auth';
import {getProjects} from '../../core/reducers/projects';

@connect((state) => ({
  uid: state.auth.user && state.auth.user.uid,
}), {
  getUser,
  getProjects,
})
class HomePage extends React.Component {

  static propTypes = {
    uid: PropTypes.string,
    getUser: PropTypes.func,
    getProjects: PropTypes.func,
  };

  componentWillMount() {
    this.props.getUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uid && nextProps.uid !== this.props.uid) {
      this.props.getProjects(nextProps.uid);
    }
  }

  render() {
    return (
      <Layout>
        <ProjectsList/>
        <ActivityLog/>
      </Layout>
    );
  }

}

export default HomePage;
