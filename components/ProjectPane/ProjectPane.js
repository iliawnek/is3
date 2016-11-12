import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import TextCard from '../TextCard';
import NewCardPlaceholder from '../NewCardPlaceholder';

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

  render() {
    const {currentProject} = this.state;

    const styles = {
      header: {
        width: '100%',
        textAlign: 'center',
        marginBottom: 50,
        fontSize: 32,
      },
      projectPane: {
        display: 'flex',
        boxSizing: 'border-box',
        padding: 50,
        flexDirection: 'column',
        alignItems: 'center',
      },
      projectName: {
        fontSize: 32,
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
          projectId={currentProject.id}
        />
      );
    }

    const title = currentProject ? currentProject.name.toUpperCase() : '';

    return (
      <div style={styles.projectPane}>
        <div style={styles.cardGrid}>
          <div style={styles.header}>{title}</div>
          {cards}
        </div>
      </div>
    );
  }
}
