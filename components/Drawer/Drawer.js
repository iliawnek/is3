import React, {Component, PropTypes} from 'react'

class Drawer extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    open: PropTypes.bool.isRequired,
    side: PropTypes.oneOf(["left", "right"]),
    onClickOutside: PropTypes.func,
  };

  render() {
    const {children, style, open, side} = this.props;

    const styles = {
      drawer: {
        height: '100%',
        zIndex: 100,
        width: 400,
        backgroundColor: '#DDD',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
        ...style,
      },
      container: {
        position: 'fixed',
        display: 'flex',
        width: '100vh',
        height: '100vh',
        zIndex: 99,
      },
      overlay: {
        height: '100%',
        width: 'calc(100vw - 400px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    };

    const overlay = (
      <div style={styles.overlay} onClick={this.props.onClickOutside}/>
    );

    return open ? (
      <div style={styles.container}>
        {side == 'right' && overlay}
        <div style={styles.drawer}>
          {children}
        </div>
        {side === 'left' && overlay}
      </div>
    ) : null;
  }
}

export default Drawer;
