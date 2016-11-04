/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';
import colors from '../../styles/colors';

class Header extends React.Component {

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
          <Link style={styles.webappName} to="/">
            WEBAPP NAME
          </Link>
        </div>
      </div>
    );
  }

}

export default Header;
