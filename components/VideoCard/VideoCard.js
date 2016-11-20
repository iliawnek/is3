import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Card from '../Card';
import Button from '../Button';
import Firebase from 'firebase';
import {changeCardTitle, deleteCard, undoDeletion} from '../../core/reducers/projects';
import {displayNotification, hideNotification} from '../../core/reducers/ui';
import Lightbox from 'react-image-lightbox';
import {Circle} from 'rc-progress';

@connect(null, {displayNotification, hideNotification})
export default class VideoCard extends Component {
  static propTypes = {
    card: PropTypes.object,
  };

  state = {
    video: null,
  };

  componentWillMount() {
    if (this.props.card.uploadPercentage === 100) {
      Firebase.storage().ref(this.props.card.id).getDownloadURL().then(url => {
        this.setState({video: url});
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.card !== this.props.card && nextProps.card.uploadPercentage === 100) {
      Firebase.storage().ref(nextProps.card.id).getDownloadURL().then(url => {
        this.setState({video: url});
      });
    }
  }

  handleTitleChange = (event) => {
    if (event.target.value !== this.props.card.title) {
      changeCardTitle(this.props.card, event.target.value);
    }
  };

  handleDelete = () => {
    const {card} = this.props;
    deleteCard(card);
    this.props.displayNotification({
      message: `\'${card.title || 'New checklist card'}\' has been removed.`,
      action: 'UNDO',
      onClick: () => {
        undoDeletion(card.projectId);
        this.props.hideNotification();
      },
    });
  };

  render() {
    const {video} = this.state;
    const {card, displayNotification, hideNotification, ...otherProps} = this.props;

    const styles = {
      card: {
        flexDirection: 'column',
        boxSizing: 'border-box',
        padding: 0,
      },
      header: {
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 16,
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        borderBottom: '1px solid #ddd',
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        height: 36,
        fontFamily: 'Montserrat, sans-serif',
        outline: 'none',
        border: 'none',
        textOverflow: 'ellipsis',
        width: 'calc(100% - 40px)',
      },
      closeButton: {
        padding: 0,
        backgroundColor: 'transparent',
        width: 40,
        height: 40,
      },
      closeIcon: {
        fill: '#ccc'
      },
      image: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
      },
      imageContainer: {
        width: '100%',
        height: 'calc(100% - 80px)',
        padding: 0,
        backgroundColor: 'transparent',
      },
      progress: {
        width: 150,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      },
      progressContainer: {
        position: 'relative',
        width: '100%',
        height: 'calc(100% - 80px)',
      },
      percentage: {
        color: '#444',
        fontSize: 32,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }
    };

    const closeButton = (
      <Button
        style={styles.closeButton}
        onClick={this.handleDelete}
      >
        <svg style={styles.closeIcon} height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </Button>
    );

    return (
      <Card style={styles.card} {...otherProps}>
        <div style={styles.header}>
          <input
            style={styles.title}
            onChange={this.handleTitleChange}
            value={card.title}
            placeholder="New video card"
          />
          {closeButton}
        </div>

        {card.uploadPercentage !== 100 && <div style={styles.progressContainer}>
          <Circle
            percent={card.uploadPercentage}
            strokeWidth={6}
            strokeColor="#E73F3F"
            strokeLinecap="square"
            style={styles.progress}
          />
          <div style={styles.percentage}>{card.uploadPercentage}%</div>
        </div>}

        {video && (
          <video width="350" height="270" src={video} controls>
          </video>
        )}

      </Card>
    );
  }
}
