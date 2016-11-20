import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TextCard from '../TextCard';
import ChecklistCard from '../ChecklistCard';
import ImageCard from '../ImageCard';
import VideoCard from '../VideoCard';
import NewCardPlaceholder from '../NewCardPlaceholder';
import ProjectBar from '../ProjectBar/ProjectBar';
import {changeProjectTitle} from '../../core/reducers/projects';
import Radium from 'radium';
import Input from '../Input';
import arrow from './arrow.png';

@connect(state => ({
  currentProject: state.ui.currentProjectId && state.projects && state.projects[state.ui.currentProjectId],
  checkedForUser: state.auth.checkedForUser,
}))

@Radium
export default class ProjectPane extends Component {

  handleTitleChange = (event) => {
    if (event.target.value !== this.props.currentProject.title) {
      changeProjectTitle(this.props.currentProject.id, event.target.value);
    }
  };

  render() {
    const {currentProject, checkedForUser} = this.props;

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
      },
      arrow: {
        position: 'absolute',
        width: 100,
        marginTop: 20,
        marginLeft: -18,
      },
      helpText: {
        position: 'absolute',
        top: 128,
        left: 95,
        width: 140,
        height: 200,
        lineHeight: 1.5,
        fontSize: 14,
      },
    };

    if (!currentProject) return (
      <div>
        <img style={styles.arrow} src={arrow}/>
        <div style={styles.helpText}>
          Click here to create or select a project.
        </div>
      </div>
    );

    let cards = (
      currentProject && currentProject.cards && Object.values(currentProject.cards).map((card) => {
        if (card === undefined) return null;
        if (card.type === 'text') {
          return <TextCard card={card} key={card.id}/>;
        } else if (card.type === 'checklist') {
          return <ChecklistCard card={card} key={card.id}/>;
        } else if (card.type === 'image') {
          return <ImageCard card={card} key={card.id}/>;
        } else if (card.type === 'video') {
          return <VideoCard card={card} key={card.id}/>;
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
