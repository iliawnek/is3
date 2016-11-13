import React, {Component, PropTypes} from 'react';

export default class Card extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
  };

  render() {
    const {children, style, ...otherProps} = this.props;

    const styles = {
      card: {
        width: 350,
        height: 350,
        backgroundColor: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
        padding: 24,
        margin: 12,
        ...style,
      },
    };

    return (
      <div style={styles.card} {...otherProps}>
        {children}
      </div>
    );
  }
}
