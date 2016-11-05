import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Drawer from '../Drawer';

@connect(state => ({
  activityLogOpen: state.ui.activityLogOpen,
}), {})

export default class ActivityLog extends Component {
  static propTypes = {
    activityLogOpen: PropTypes.bool,
  };

  render() {
    const {activityLogOpen} = this.props;

    const styles = {
      drawer: {

      }
    };

    return (
      <Drawer
        open={activityLogOpen}
        style={styles.drawer}
        side="right"
      >

      </Drawer>
    );
  }
}
