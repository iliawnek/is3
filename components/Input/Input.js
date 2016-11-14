import React, {Component, PropTypes} from 'react';
import AutosizeInput from 'react-input-autosize';
import Radium from 'radium';
import ReactTooltip from 'react-tooltip';

@Radium
export default class Input extends Component {
  static propTypes = {
    style: PropTypes.object,
    tooltip: PropTypes.string,
  };

  state = {
    hovering: false,
    editing: false,
  };

  handleMouseEnter = () => this.setState({hovering: true});
  handleMouseLeave = () => this.setState({hovering: false});
  enableEditing = () => this.setState({editing: true});
  disableEditing = () => this.setState({editing: false});

  render() {
    const {style, ...otherProps} = this.props;
    const {hovering, editing} = this.state;

    const styles = {
      input: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        // override default input style
        border: 'none',
        outline: 'none',
        backgroundColor: hovering || editing ? 'rgba(0,0,0,0.08)' : 'transparent',
        fontFamily: 'Montserrat, sans-serif',
        // textOverflow: 'ellipsis',
        ...style,
      },
    };

    return (
      <div data-tip="Click to rename" data-for="input">
        <AutosizeInput
          inputStyle={styles.input}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onFocus={this.enableEditing}
          onBlur={this.disableEditing}
          {...otherProps}
        />
        {!editing && <ReactTooltip id="input" effect="solid" place="top"/>}
      </div>
    );
  }
}
