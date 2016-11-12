import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TextCard from '../TextCard';
import NewCardPlaceholder from '../NewCardPlaceholder';
import {changeProjectTitle} from '../../core/reducers/projects';

@connect(state => ({
  projects: state.projects,
  currentProjectId: state.ui.currentProjectId,
}), {})

export default class ProjectPane extends Component {
  static propTypes = {
    currentProjectId: PropTypes.string,
  };

  state = {
    currentProject: null,
  };

  componentWillReceiveProps(nextProps) {
    const {currentProjectId, projects} = nextProps;
    this.setState({
      currentProject: projects && projects[currentProjectId],
    });
  }

  handleTitleChange = (event) => {
    if (event.target.value !== this.state.currentProject.title) {
      changeProjectTitle(this.state.currentProject.id, event.target.value);
    }
  };

  render() {
    const {currentProject} = this.state;

    const styles = {
      header: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 50,
        fontSize: 32,
        height: 36,
        fontFamily: 'Montserrat, sans-serif',
        outline: 'none',
        border: 'none',
        textOverflow: 'ellipsis',
        backgroundColor: 'transparent',
        textTransform: 'uppercase',
      },
      projectPane: {
        display: 'flex',
        boxSizing: 'border-box',
        padding: 50,
        flexDirection: 'column',
        alignItems: 'center',
      },
      cardGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
      }
    };

    const cards = (
      currentProject && Object.values(currentProject.cards).map((card) => {
        return (
          <TextCard card={card} key={card.id}/>
        );
      })
    );

    if (cards) {
      cards.push(
        <NewCardPlaceholder
          key={currentProject.id}
          projectId={currentProject.id}
        />
      );
    }

    const title = currentProject ? currentProject.title : '';

    return (
      <div style={styles.projectPane}>
        <div style={styles.cardGrid}>
          <input
            style={styles.header}
            onChange={this.handleTitleChange}
            value={title}
            placeholder="NEW PROJECT"
          />
          {cards}
        </div>
      </div>
    );
  }
}
