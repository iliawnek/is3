import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TextCard from '../TextCard';
import ChecklistCard from '../ChecklistCard';
import NewCardPlaceholder from '../NewCardPlaceholder';
import ProjectBar from '../ProjectBar/ProjectBar';
import {changeProjectTitle} from '../../core/reducers/projects';
import Radium from 'radium';
import Input from '../Input';

@connect(state => ({
  currentProject: state.ui.currentProjectId && state.projects && state.projects[state.ui.currentProjectId],
}))

@Radium
export default class ProjectPane extends Component {

  handleTitleChange = (event) => {
    if (event.target.value !== this.props.currentProject.title) {
      changeProjectTitle(this.props.currentProject.id, event.target.value);
    }
  };

  render() {
    const {currentProject} = this.props;
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
        if (card === undefined) return null;
        if (card.type === 'text') {
          return <TextCard card={card} key={card.id}/>;
        } else if (card.type === 'checklist') {
          return <ChecklistCard card={card} key={card.id}/>;
        }
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
          {currentProject && <ProjectBar
            collaboratorIds={Object.keys(currentProject.collaborators)}
            style={styles.collaboratorList}
            project={currentProject}
          />}
        </div>
        <div style={styles.cardGrid}>
          {cards}
        </div>
      </div>
    );
  }
}
