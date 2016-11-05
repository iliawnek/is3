import React, {Component, PropTypes} from 'react';

export default class Avatar extends Component {
  static propTypes = {
    image: PropTypes.string,
    style: PropTypes.object,
  };

  render() {
    const {image, style} = this.props;

    const styles = {
      avatar: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        objectFit: 'cover',
        ...style,
      },
    };

    return (
      <img
        src={image}
        style={styles.avatar}
      />
    );
  }
}
