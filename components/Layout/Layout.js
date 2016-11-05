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
import {connect} from 'react-redux';
import {getUser} from '../../core/reducers/auth';

@connect(null, {getUser})
class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    getUser: PropTypes.func,
    children: PropTypes.node,
  };

  componentWillMount() {
    this.props.getUser();
  }

  render() {
    const {children} = this.props;

    const styles = {
      layout: {
        flexDirection: 'column',
        width: '100vw',
      },
    };

    return (
      <div style={styles.layout}>
        <Header/>
        <main>
          {children}
        </main>
      </div>
    );
  }
}

export default Layout;
