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
      },
      projectPane: {
        display: 'flex',
        maxWidth: 890,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 50,
        flexDirection: 'column',
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
      maxWidth: 990,
      minPadding: 100,
    });

    const cardGrid = (
      <div style={styles.cardGrid}>
        <Grid
          itemHeight={600}
          component="div"
          columns={2}
          columnWidth={420}
          gutterWidth={50}
          gutterHeight={50}
          duration={800}
          springConfig={{stiffness: 170, damping: 26}}
        >
          {cards}
        </Grid>
      </div>
    );

    const title = currentProject ? currentProject.name.toUpperCase() : '';

    return (
      <div style={styles.projectPane}>
        <div style={styles.header}>
          <div style={styles.projectName}>{title}</div>
        </div>
        {cardGrid}
      </div>
    );
  }
}
