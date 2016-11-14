import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TextCard from '../TextCard';
import NewCardPlaceholder from '../NewCardPlaceholder';
import CollaboratorList from '../ProjectBar/ProjectBar';
import {changeProjectTitle} from '../../core/reducers/projects';
import Radium from 'radium';
import Input from '../Input';

@connect(state => ({
  projects: state.projects,
  currentProjectId: state.ui.currentProjectId,
}), {})

@Radium
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
    if (!currentProject) return null;

    const styles = {
      header: {
        marginBottom: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      },
      title: {
        textAlign: 'center',
        fontSize: 32,
        transition: 'background-color 0.3s ease-in-out',
      },
      collaboratorList: {
        marginTop: 16,
      },
      projectPane: {
        display: 'flex',
        boxSizing: 'border-box',
        padding: 48,
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

    let cards = (
      currentProject && currentProject.cards && Object.values(currentProject.cards).map((card) => {
        return (
          <TextCard card={card} key={card.id}/>
        );
      })
    );

    const placeholder = currentProject && (
        <NewCardPlaceholder
          key={currentProject.id}
          projectId={currentProject.id}
        />
      );

    if (cards) cards.push(placeholder);
    else cards = placeholder;

    const title = currentProject && currentProject.title ? currentProject.title : '';

    return (
      <div style={styles.projectPane}>
        <div style={styles.header}>
          <Input
            style={styles.title}
            onChange={this.handleTitleChange}
            value={title}
            placeholder="New project"
          />
          {currentProject && <CollaboratorList
            collaboratorIds={Object.keys(currentProject.collaborators)}
            style={styles.collaboratorList}
          />}
        </div>
        <div style={styles.cardGrid}>
          {cards}
        </div>
      </div>
    );
  }
}
