import React, {Component, PropTypes} from 'react';

export default class ChecklistItem extends Component {
  static propTypes = {
    task: PropTypes.object,
    handleTaskTitleChange: PropTypes.func,
    handleCompleteTask: PropTypes.func,
    handleUncompleteTask: PropTypes.func,
  };

  handleTaskTitleChange = (event) => {
    this.props.handleTaskTitleChange(this.props.task.id, event.target.value);
  };

  handleCompleteTask = () => {
    this.props.handleCompleteTask(this.props.task.id);
  };

  handleUncompleteTask = () => {
    this.props.handleUncompleteTask(this.props.task.id);
  };

  render() {
    const {task, handleTaskTitleChange, handleCompleteTask, handleUncompleteTask, ...otherProps} = this.props;

    const styles = {
      task: {
        display: 'flex',
        flexDirection: 'row',
        height: 36,
        alignItems: 'center',
      },
      unchecked: {
        height: 18,
        width: 18,
        marginRight: 8,
        border: '2px solid #666',
        borderRadius: '50%',
        boxSizing: 'border-box',
      },
      checked: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 18,
        width: 18,
        marginRight: 8,
        backgroundColor: '#666',
        borderRadius: '50%',
      },
      title: {
        fontSize: 14,
        height: 20,
        fontFamily: 'Montserrat, sans-serif',
        outline: 'none',
        border: 'none',
        textOverflow: 'ellipsis',
        width: 'calc(100% - 36px)',
      },
    };

    return (
      <div style={styles.task} {...otherProps}>
        {!task.checked && <div
          style={styles.unchecked}
          onClick={this.handleCompleteTask}
        />}
        {task.checked && <div
          style={styles.checked}
          onClick={this.handleUncompleteTask}
        >
          <svg fill="white" height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>
        </div>}
        <input
          style={styles.title}
          onChange={this.handleTaskTitleChange}
          value={task.title}
          placeholder="Enter task name..."
        />
      </div>
    );
  }
}
