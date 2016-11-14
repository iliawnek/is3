import React, {Component, PropTypes} from 'react';
import ReactTooltip from 'react-tooltip';

export default class Avatar extends Component {
  static propTypes = {
    image: PropTypes.string,
    style: PropTypes.object,
    tooltip: PropTypes.string,
  };

  render() {
    const {image, style, tooltip, ...otherProps} = this.props;

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
      <div>
        <img
          data-tip={tooltip}
          data-for={image}
          src={image}
          style={styles.avatar}
          {...otherProps}
        />
        <ReactTooltip id={image} effect="solid" place="bottom"/>
      </div>
    );
  }
}
