import React, {Component, PropTypes} from 'react';

export default class Drawer extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    open: PropTypes.bool.isRequired,
    side: PropTypes.oneOf(["left", "right"]),
  };

  render() {
    const {children, style, open, side} = this.props;

    const styles = {
      drawer: {
        position: 'fixed',
        right: side === 'right' ? 0 : 'auto',
        height: 'calc(100vh - 60px)',
        width: 400,
        backgroundColor: '#DDD',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
        ...style,
      }
    };

    return open ? (
      <div style={styles.drawer}>
        {children}
      </div>
    ) : null;
  }
}
