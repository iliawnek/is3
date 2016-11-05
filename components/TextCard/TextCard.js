import React, {Component, PropTypes} from 'react';
import Card from '../Card';

export default class TextCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
  };

  render() {
    const {title, text, ...otherProps} = this.props;

    const styles = {
      card: {
        flexDirection: 'column',
      },
      title: {
        fontSize: 24,
      },
      text: {
        fontSize: 16,
        color: '#444',
        marginTop: 24,
      },
    };

    return (
      <Card style={styles.card} {...otherProps}>
        <div style={styles.title}>{title}</div>
        <div style={styles.text}>{text}</div>
      </Card>
    );
  }
}
