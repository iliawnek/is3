import {connect} from 'react-redux';
import * as authActions from '../../core/reducers/auth';

import React, {Component, PropTypes} from 'react';
import Button from '../Button';
import Avatar from '../Avatar';

@connect(store => ({
  user: store.auth.user,
}), authActions)

export default class UserButton extends Component {
  static propTypes = {
    user: PropTypes.object,
    signIn: PropTypes.func,
    signOut: PropTypes.func,
  };

  render() {
    const {user} = this.props;

    const styles = {
      avatar: {
        marginLeft: 10,
      },
    };

    const signInButton = (
      <Button
        onClick={this.props.signIn}
      >
        SIGN IN WITH GOOGLE
      </Button>
    );

    const userButton = user && (
      <Button>
        {user.displayName}
        <Avatar
          image={user.photoURL}
          style={styles.avatar}
        />
      </Button>
    );

    return user ? userButton : signInButton;
  }
}
