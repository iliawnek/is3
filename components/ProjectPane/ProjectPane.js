import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {SpringGrid, makeResponsive} from 'react-stonecutter';
import TextCard from '../TextCard';

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
        marginBottom: 50,
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
    };

    const cards = (
      currentProject && Object.values(currentProject.cards).map((card) => {
        return (
          <div key={card.id}>
            <TextCard card={card}/>
          </div>
        );
      })
    );

    const Grid = makeResponsive(SpringGrid, {
      maxWidth: 1650,
      minPadding: 100,
    });

    const title = currentProject ? currentProject.name.toUpperCase() : '';

    const cardGrid = (
      <div>
        <div style={styles.header}>
          <div style={styles.projectName}>{title}</div>
        </div>
        <Grid
          itemHeight={350}
          component="div"
          columns={4}
          columnWidth={350}
          gutterWidth={50}
          gutterHeight={50}
          duration={800}
          springConfig={{stiffness: 170, damping: 26}}
        >
          {cards}
        </Grid>
      </div>
    );

    return (
      <div style={styles.projectPane}>
        {cardGrid}
      </div>
    );
  }
}
