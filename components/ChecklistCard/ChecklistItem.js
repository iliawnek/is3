import React, {Component, PropTypes} from 'react';

export default class ChecklistItem extends Component {
  static propTypes = {
    task: PropTypes.object,
    handleTaskTitleChange: PropTypes.func,
    handleCompleteTask: PropTypes.func,
    handleUncompleteTask: PropTypes.func,
  };

  state = {hovering: false};

  handleTaskTitleChange = (event) => {
    this.props.handleTaskTitleChange(this.props.task.id, event.target.value);
  };

  handleCompleteTask = () => {
    this.props.handleCompleteTask(this.props.task.id);
  };

  handleUncompleteTask = () => {
    this.props.handleUncompleteTask(this.props.task.id);
  };

  handleMouseEnter = () => this.setState({hovering: true});
  handleMouseLeave = () => this.setState({hovering: false});

  render() {
    const {hovering} = this.state;
    const {
      task,
      handleTaskTitleChange,
      handleCompleteTask,
      handleUncompleteTask,
      ...otherProps,
    } = this.props;

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
        boxSizing: 'border-box',
      },
      checkCircle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 18,
        width: 18,
        marginRight: 8,
        border: '2px solid #666',
        backgroundColor: task.checked ? '#666' : 'transparent',
        borderRadius: '50%',
        cursor: 'pointer',
      },
      title: {
        fontSize: 14,
        height: 20,
        fontFamily: 'Montserrat, sans-serif',
        outline: 'none',
        border: 'none',
        textOverflow: 'ellipsis',
        width: 'calc(100% - 36px)',
        textDecoration: task.checked ? 'line-through' : 'none',
        color: task.checked ? '#aaa' : '#444',
      },
    };

    return (
      <div style={styles.task} {...otherProps}>
        <div
          style={styles.checkCircle}
          onClick={task.checked ? this.handleUncompleteTask : this.handleCompleteTask}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {(task.checked || hovering) && <svg fill={(hovering && !task.checked) ? '#666' : 'white'} height="14" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
          </svg>}
        </div>
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
