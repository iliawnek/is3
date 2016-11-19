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
import ReactTooltip from 'react-tooltip';
import colors from '../../styles/colors';
import {signIn, signOut} from '../../core/reducers/auth';
import {
  openProjectsList,
  closeProjectsList,
} from '../../core/reducers/ui';

@connect(store => ({
  projectsListOpen: store.ui.projectsListOpen,
  signedIn: store.auth.signedIn,
}), {
  // auth
  signIn,
  signOut,
  // ui
  openProjectsList,
  closeProjectsList,
})
class Header extends React.Component {
  static propTypes = {
    signIn: PropTypes.func,
    signOut: PropTypes.func,
    signedIn: PropTypes.bool,
  };

  render() {
    const {
      projectsListOpen,
      openProjectsList,
      closeProjectsList,
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
        display: 'flex',
        boxSizing: 'border-box',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'transparent',
        color: 'white',
      },
      icon: {
        fill: 'white',
      },
    };

    const projectsButton = (
      <Button
        onClick={projectsListOpen ? closeProjectsList : openProjectsList}
        data-tip={projectsListOpen ? "Close projects list" : "View all your projects"}
        data-for="header-button"
      >
        <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          {projectsListOpen ?
            <path style={styles.icon} d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/> :
            <path style={styles.icon} d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          }
        </svg>
      </Button>
    );

    return (
      <div style={styles.header}>
        <div style={styles.headerSection}>
          {projectsButton}
          <div style={styles.webappName}>WEBAPP NAME</div>
        </div>
        <div style={styles.headerSection}>
          <UserButton/>
          <Button
            style={styles.signOutButton}
            data-tip="Sign out"
            data-for="header-button"
            onClick={this.props.signOut}>
            <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path style={styles.icon} d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
            </svg>
          </Button>
        </div>
        <ReactTooltip delayShow={200} id="header-button" effect="solid" place="bottom"/>
      </div>
    );
  }

}

export default Header;
