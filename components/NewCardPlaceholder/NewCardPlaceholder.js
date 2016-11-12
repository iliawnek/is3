import React, {Component, PropTypes} from 'react';
import Button from '../Button';
import {createTextCard} from '../../core/reducers/projects';

export default class NewCardPlaceholder extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
  };

  handleClick = (projectId) => {
    createTextCard(projectId);
  };

  render() {
    const {projectId, ...otherProps} = this.props;

    const styles = {
      placeholder: {
        width: 350,
        height: 350,
        margin: 24,
        backgroundColor: 'transparent',
        border: '2px dashed #CCC',
        color: '#CCC',
        flexDirection: 'column',
        alignItems: 'center',
      },
      icon: {
        marginBottom: 16,
        circle: {
          fill: '#CCC',
        },
        add: {
          fill: '#EEE',
        },
      },
      label: {
        fontSize: 22,
      },
    };

    return (
      <Button
        onClick={this.handleClick.bind(this, projectId)}
        {...otherProps}
        style={styles.placeholder}
      >
        <svg style={styles.icon} width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <circle cx={10} cy={10} r={10} style={styles.icon.circle}/>
          <path style={styles.icon.add} d="M 11 4L 9 4L 9 9L 4 9L 4 11L 9 11L 9 16L 11 16L 11 11L 16 11L 16 9L 11 9L 11 4Z"/>/>
        </svg>
        <span style={styles.label}>
          CREATE NEW CARD
        </span>
      </Button>
    );
  }
}
