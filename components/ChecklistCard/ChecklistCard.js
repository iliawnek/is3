import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Card from '../Card';
import ChecklistItem from './ChecklistItem';
import Button from '../Button';
import {changeCardTitle, deleteCard, undoDeletion, completeTask, uncompleteTask, changeTaskTitle} from '../../core/reducers/projects';
import {displayNotification, hideNotification} from '../../core/reducers/ui';

@connect(state => ({user: state.auth.user}), {displayNotification, hideNotification})
export default class ChecklistCard extends Component {
  static propTypes = {
    card: PropTypes.object,
    user: PropTypes.object,
  };

  handleTitleChange = (event) => {
    if (event.target.value !== this.props.card.title) {
      changeCardTitle(this.props.card, event.target.value);
    }
  };

  handleTaskTitleChange = (taskId, newTitle) => {
    changeTaskTitle(this.props.card.id, taskId, newTitle);
  };

  handleCompleteTask = (taskId) => {
    completeTask(this.props.card.id, taskId);
  };

  handleUncompleteTask = (taskId) => {
    uncompleteTask(this.props.card.id, taskId);
  };

  handleDelete = () => {
    const {card} = this.props;
    deleteCard(card);
    this.props.displayNotification({
      message: `\'${card.title || 'New checklist card'}\' has been deleted.`,
      action: 'UNDO',
      onClick: () => {
        undoDeletion(card.projectId);
        this.props.hideNotification();
      },
    });
  };

  render() {
    const {card, user, displayNotification, hideNotification, ...otherProps} = this.props;

    const styles = {
      card: {
        flexDirection: 'column',
        boxSizing: 'border-box',
      },
      header: {
        width: '100%',
        display: 'flex',

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
      checklist: {
      },
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
            placeholder="New checklist card"
          />
          {closeButton}
        </div>
        <div style={styles.checklist}>
          {card && card.tasks && Object.keys(card.tasks).map(id =>
            <ChecklistItem
              task={card.tasks[id]}
              key={id}
              handleTaskTitleChange={this.handleTaskTitleChange}
              handleCompleteTask={this.handleCompleteTask}
              handleUncompleteTask={this.handleUncompleteTask}
            />
          )}
        </div>
      </Card>
    );
  }
}
