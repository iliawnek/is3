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
import ProjectPane from '../../components/ProjectPane';
import Button from '../../components/Button';
import {getUser, signIn} from '../../core/reducers/auth';
import {getProjects} from '../../core/reducers/projects';
import {getCurrentProjectId} from '../../core/reducers/ui';
import {Notification} from 'react-notification';

@connect((state) => ({
  user: state.auth.user,
  signedIn: state.auth.signedIn,
  checkedForUser: state.auth.checkedForUser,
  projects: state.projects,
  currentProjectId: state.ui.currentProjectId,
  notification: state.ui.notification,
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
    notification: PropTypes.object,
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
        paddingLeft: 0,
      },
      googleContainer: {
        border: '1px solid #4285F4',
        boxSizing: 'border-box',
        width: 60,
        height: 60,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
      },
    };

    if (this.props.signedIn) {
      return (
        <Layout>
          <ProjectsList/>
          <ProjectPane/>
          <Notification
            message=""
            isActive={false}
            {...this.props.notification}
          />
        </Layout>
      );
    }

    return (
      <div style={styles.landing}>
        <div style={styles.content}>
          <div style={styles.title}>WEBAPP NAME</div>
          <div style={styles.subtitle}>This is a subtitle.</div>
          <Button
            onClick={this.props.signIn}
            style={styles.signInButton}
          >
            <div style={styles.googleContainer}>
              <svg style={styles.google} width={24} height={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                <path
                  fill="#4285F4"
                  d="M45,20h-2.5h-8.2h-9.8v8.5h11.8c-1.1,5.4-5.7,8.5-11.8,8.5c-7.2,0-13-5.8-13-13s5.8-13,13-13c3.1,0,5.9,1.1,8.1,2.9L39,7.5
          C35.1,4.1,30.1,2,24.5,2c-12.2,0-22,9.8-22,22s9.8,22,22,22c11,0,21-8,21-22C45.5,22.7,45.3,21.3,45,20z"
                />
              </svg>
            </div>
            ENTER WITH GOOGLE
          </Button>
        </div>
      </div>
    )
  }

}

export default HomePage;
