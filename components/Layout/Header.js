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
import Button from '../Button';
import UserButton from './UserButton';
import colors from '../../styles/colors';
import {signIn, signOut} from '../../core/reducers/auth';
import {
  openProjectsList,
  closeProjectsList,
  openActivityLog,
  closeActivityLog,
} from '../../core/reducers/ui';

@connect(store => ({
  projectsListOpen: store.ui.projectsListOpen,
  activityLogOpen: store.ui.activityLogOpen,
}), {
  // auth
  signIn,
  signOut,
  // ui
  openProjectsList,
  closeProjectsList,
  openActivityLog,
  closeActivityLog,
})
class Header extends React.Component {
  static propTypes = {
    signIn: PropTypes.func,
    signOut: PropTypes.func,
  };

  render() {
    const {
      projectsListOpen,
      activityLogOpen,
      openProjectsList,
      closeProjectsList,
      openActivityLog,
      closeActivityLog,
    } = this.props;

    const styles = {
      header: {
        display: 'flex',
        position: 'fixed',
        height: 60,
        zIndex: 200,
        width: '100%',
        backgroundColor: colors.primary,
        justifyContent: 'space-between',
      },
      headerSection: {
        display: 'flex',
      },
      webappName: {
        color: 'white',
      },
      icon: {
        fill: 'white',
      }
    };

    const projectsButton = (
      <Button onClick={projectsListOpen ? closeProjectsList : openProjectsList}>
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path style={styles.icon} d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </Button>
    );

    const activityButton = (
      <Button onClick={activityLogOpen ? closeActivityLog : openActivityLog}>
        <svg width="24" height="20" viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
          <path style={styles.icon} d="M 8 20C 9.1 20 10 19.0769 10 17.9487L 6 17.9487C 6 19.0769 6.89 20 8 20ZM 14 13.8462L 14 8.71795C 14 5.56923 12.36 2.93333 9.5 2.2359L 9.5 1.53846C 9.5 0.68718 8.83 0 8 0C 7.17 0 6.5 0.68718 6.5 1.53846L 6.5 2.2359C 3.63 2.93333 2 5.55897 2 8.71795L 2 13.8462L 0 15.8974L 0 16.9231L 16 16.9231L 16 15.8974L 14 13.8462Z"/>
        </svg>
      </Button>
    );


    return (
      <div style={styles.header}>
        <div style={styles.headerSection}>
          {projectsButton}
          <Button to="/">WEBAPP NAME</Button>
        </div>
        <div style={styles.headerSection}>
          <UserButton/>
          {activityButton}
        </div>
      </div>
    );
  }

}

export default Header;
