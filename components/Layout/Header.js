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

@connect(store => ({

}), {
  signIn,
  signOut,
})
class Header extends React.Component {
  static propTypes = {
    signIn: PropTypes.func,
    signOut: PropTypes.func,
  };

  render() {
    const styles = {
      header: {
        height: 60,
        width: '100vw',
        backgroundColor: colors.primary,
        justifyContent: 'center',
      },
      container: {
        maxWidth: 934,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      webappName: {
        color: 'white',
      },
    };

    return (
      <div style={styles.header}>
        <div style={styles.container}>
          <Button to="/">WEBAPP NAME</Button>
          <UserButton/>
        </div>
      </div>
    );
  }

}

export default Header;
