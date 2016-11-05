import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {SpringGrid, layout, measureItems} from 'react-stonecutter';
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
    const {currentProjectId: thisCurrentProjectId} = this.props;
    const {currentProjectId: nextCurrentProjectId, projects} = nextProps;
    if (projects && nextCurrentProjectId && nextCurrentProjectId !== thisCurrentProjectId) {
      this.setState({
        currentProject: projects[nextCurrentProjectId],
      });
    }
  }

  render() {
    const {currentProject} = this.state;

    const styles = {
      header: {
        width: '100%',
      },
      projectPane: {
        maxWidth: 950,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 50,
        flexDirection: 'column',
      },
      projectName: {
        fontSize: 32,
      },
      cardContainer: {
        width: 400,
        marginTop: 50,
      },
      cardGrid: {
        flexDirection: 'column',
      },
    };

    const cards = (
      currentProject && Object.keys(currentProject.cards).map((cardId) => {
        const card = currentProject.cards[cardId];
        return (
          <div key={cardId} style={styles.cardContainer}>
            <TextCard title={card.title} text={card.text || ''}/>
          </div>
        );
      })
    );

    const Grid = measureItems(SpringGrid);

    const cardGrid = (
      <div style={styles.cardGrid}>
        <Grid
          itemHeight={400}
          component="div"
          columns={2}
          columnWidth={400}
          gutterWidth={50}
          gutterHeight={50}
          duration={800}
          easing="ease-out"
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
        <div style={styles.cardGrid}>
          {cards}
        </div>
      </div>
    );
  }
}
