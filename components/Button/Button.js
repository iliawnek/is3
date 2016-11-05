import React, {Component, PropTypes} from 'react';
import Link from '../Link';
import colors from '../../styles/colors';

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    to: PropTypes.string,
    selected: PropTypes.bool,
  };

  state = {
    hovering: false,
  };

  handleMouseEnter = () => this.setState({hovering: true});
  handleMouseLeave = () => this.setState({hovering: false});

  render() {
    const {hovering} = this.state;
    const {style, children, to, selected, ...otherProps} = this.props;

    const styles = {
      button: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingLeft: 20,
        paddingRight: 20,
        cursor: 'pointer',
        backgroundColor: colors.primary,
        color: 'white',
        ...style,
      },
      overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: hovering || selected ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
        transition: 'background-color 0.2s ease-in-out',
      },
    };

    const button = (
      <div
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={styles.button}
        {...otherProps}
      >
        {children}
        <div style={styles.overlay}/>
      </div>
    );

    return to ? <Link to={to}>{button}</Link> : button;
  }
}
