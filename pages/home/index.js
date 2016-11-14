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
import Button from '../../components/Button';
import {getUser, signIn} from '../../core/reducers/auth';
import {getProjects} from '../../core/reducers/projects';
import {getCurrentProjectId} from '../../core/reducers/ui';

@connect((state) => ({
  user: state.auth.user,
  signedIn: state.auth.signedIn,
  checkedForUser: state.auth.checkedForUser,
  projects: state.projects,
  currentProjectId: state.ui.currentProjectId,
}), {
  getUser,
  signIn,
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
    signedIn: PropTypes.bool,
    checkedForUser: PropTypes.bool,
    signIn: PropTypes.func,
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
    if (!this.props.checkedForUser && !this.props.signedIn) return null;

    if (this.props.signedIn) {
      return (
        <Layout>
          <ProjectsList/>
          <ProjectPane/>
          <ActivityLog/>
        </Layout>
      );
    }

    const styles = {
      landing: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100vw',
        height: '100vh',
      },
      content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      title: {
        fontSize: 48,
      },
      subtitle: {
        fontSize: 24,
        marginTop: 12,
        color: '#444',
      },
      signInButton: {
        backgroundColor: '#4285F4',
        marginTop: 64,
      },
    };

    return (
      <div style={styles.landing}>
        <div style={styles.content}>
          <div style={styles.title}>WEBAPP NAME</div>
          <div style={styles.subtitle}>This is a subtitle.</div>
          <Button
            onClick={this.props.signIn}
            style={styles.signInButton}
          >
            ENTER WITH GOOGLE
          </Button>
        </div>
      </div>
    )
  }

}

export default HomePage;
