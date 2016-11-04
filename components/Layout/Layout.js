/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Header from './Header';

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    return (
      <div>
        <Header/>
        <main>
          <div {...this.props}/>
        </main>
      </div>
    );
  }
}

export default Layout;
