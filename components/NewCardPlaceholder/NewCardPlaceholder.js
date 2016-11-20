import React, {Component, PropTypes} from 'react';
import Button from '../Button';
import {createTextCard, createChecklistCard, createImageCard} from '../../core/reducers/projects';

export default class NewCardPlaceholder extends Component {
  static propTypes = {
    projectId: PropTypes.string.isRequired,
  };

  state = {
    showOptions: false,
    hoveringImage: false,
    hoveringVideo: false,
  };

  chooseCardType = () => {
    this.setState({showOptions: true});
  };

  createCard = (projectId, type, file) => {
    this.setState({showOptions: false});
    if (type === 'text') {
      createTextCard(projectId);
    } else if (type === 'checklist') {
      createChecklistCard(projectId);
    } else if (type === 'image') {
      createImageCard(projectId, file);
    } else if (type === 'video') {

    }
  };

  handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.createCard(this.props.projectId, 'image', file);
    }
  };

  handleVideoUpload = (event) => {
    // this.createCard(this.props.projectId, 'video');
  };

  handleMouseEnterImage = () => this.setState({hoveringImage: true});
  handleMouseLeaveImage = () => this.setState({hoveringImage: false});
  handleMouseEnterVideo = () => this.setState({hoveringVideo: true});
  handleMouseLeaveVideo = () => this.setState({hoveringVideo: false});

  imageInput;
  videoInput;

  render() {
    const {showOptions, hoveringImage, hoveringVideo} = this.state;
    const {projectId, ...otherProps} = this.props;

    const styles = {
      placeholder: {
        width: 350,
        height: 350,
        margin: 12,
        backgroundColor: 'transparent',
        border: '2px dashed #CCC',
        color: '#CCC',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
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
      optionButton: {
        width: 120,
        height: 120,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#CCC',
        color: 'white',
        margin: 8,
        cursor: 'pointer',
      },
      optionButtonContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      },
      optionIcon: {
        fill: 'white',
      },
      cancelButton: {
        backgroundColor: 'transparent',
        color: '#CCC',
      },
      optionLabel: {
        marginTop: 8,
      },
      title: {
        color: '#BBB',
        marginBottom: 8,
      },
      input: {
        width: 0.1,
        height: 0.1,
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: -1,
      },
      imageUploader: {
        // position: 'absolute',
        // width: '100%',
        // height: '100%',
        // top: 0,
        // left: 0,
        zIndex: 50,
      },
      imageOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: hoveringImage ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
        transition: 'background-color 0.2s ease-in-out',
      },
      videoOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: hoveringVideo ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
        transition: 'background-color 0.2s ease-in-out',
      },
    };

    if (!showOptions) {
      return (
        <Button
          onClick={this.chooseCardType}
          {...otherProps}
          style={styles.placeholder}
        >
          <svg style={styles.icon} width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <circle cx={10} cy={10} r={10} style={styles.icon.circle}/>
            <path style={styles.icon.add}
                  d="M 11 4L 9 4L 9 9L 4 9L 4 11L 9 11L 9 16L 11 16L 11 11L 16 11L 16 9L 11 9L 11 4Z"/>
            />
          </svg>
          <span style={styles.label}>
            CREATE NEW CARD
          </span>
        </Button>
      );
    } else {
      return (
        <div style={styles.placeholder}>
          <div style={styles.title}>
            CHOOSE A CARD TYPE
          </div>
          <div style={styles.optionButtonContainer}>
            <Button style={styles.optionButton} onClick={this.createCard.bind(this, projectId, 'text')}>
              <svg style={styles.optionIcon} height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/>
              </svg>
              <span style={styles.optionLabel}>TEXT</span>
            </Button>

            <Button style={styles.optionButton} onClick={this.createCard.bind(this, projectId, 'checklist')}>
              <svg style={styles.optionIcon} height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
              <span style={styles.optionLabel}>CHECKLIST</span>
            </Button>

            <input
              ref={input => this.imageInput = input}
              type="file"
              id="image-upload"
              onChange={this.handleImageUpload}
              style={styles.input}
              accept="image/*"
            />
            <label
              htmlFor="image-upload"
              style={styles.optionButton}
              onMouseEnter={this.handleMouseEnterImage}
              onMouseLeave={this.handleMouseLeaveImage}
              onChange={this.handleImageUpload}
            >
              <svg style={styles.optionIcon} height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/>
              </svg>
              <span style={styles.optionLabel}>IMAGE</span>
              <div style={styles.imageOverlay}/>
            </label>

            <input
              ref={input => this.videoInput = input}
              type="file"
              id="video-upload"
              onChange={this.handleImageUpload}
              style={styles.input}
              accept="video/*"
            />
            <label
              htmlFor="video-upload"
              style={styles.optionButton}
              onMouseEnter={this.handleMouseEnterVideo}
              onMouseLeave={this.handleMouseLeaveVideo}
              onChange={this.handleVideoUpload}
            >
              <svg style={styles.optionIcon} height="36" viewBox="0 0 24 24" width="36" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              <span style={styles.optionLabel}>VIDEO</span>
              <div style={styles.videoOverlay}/>
            </label>
          </div>
        </div>
      )
    }
  }
}
