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
import Header from './Header';

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const {children} = this.props;

    const styles = {
      layout: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      },
      main: {
        marginTop: 60,
      },
    };

    return (
      <div style={styles.layout}>
        <Header/>
        <main style={styles.main}>
          {children}
        </main>
      </div>
    );
  }
}

export default Layout;
