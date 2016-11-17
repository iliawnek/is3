import React, {Component, PropTypes} from 'react';
import Button from '../Button';

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    open: PropTypes.bool,
    title: PropTypes.string,
    onClickOutside: PropTypes.func,
  };

  render() {
    const {children, style, open, title, ...otherProps} = this.props;
    if (!open) return null;

    const styles = {
      container: {
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        zIndex: 299,
      },
      modal: {
        width: 500,
        padding: 48,
        backgroundColor: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
        zIndex: 300,
        ...style,
      },
      overlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 299,
        position: 'absolute',
      },
      title: {
        fontSize: 24,
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
      },
      closeButton: {
        padding: 0,
        backgroundColor: 'transparent',
        width: 40,
        height: 40,
      },
      closeIcon: {
        fill: '#888',
      },
    };

    const closeButton = (
      <Button
        style={styles.closeButton}
        onClick={this.props.onClickOutside}
      >
        <svg style={styles.closeIcon} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </Button>
    );

    return (
      <div style={styles.container}>
        <div style={styles.modal} {...otherProps}>
          <div style={styles.header}>
            <div style={styles.title}>{title}</div>
            {closeButton}
          </div>
          {children}
        </div>
        <div
          style={styles.overlay}
          onClick={this.props.onClickOutside}
        />
      </div>
    );
  }
}
