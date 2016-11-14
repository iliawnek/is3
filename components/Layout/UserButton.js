import {connect} from 'react-redux';

import React, {Component, PropTypes} from 'react';
import Avatar from '../Avatar';

@connect(store => ({user: store.auth.user}))

export default class UserButton extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    const {user} = this.props;

    const styles = {
      badge: {
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
      avatar: {
        marginLeft: 10,
      },
    };

    return user && (
      <div style={styles.badge}>
        {user.displayName}
        <Avatar
          image={user.photoURL}
          style={styles.avatar}
        />
      </div>
    );
  }
}
