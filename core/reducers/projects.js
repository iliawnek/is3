import Firebase from 'firebase';

const GET_PROJECT = 'is3/projects/GET_PROJECT';
const GET_CARD = 'is3/projects/GET_CARD';
const CHANGE_CARD = 'is3/projects/CHANGE_CARD';

export function getProjects(uid) {
  return (dispatch) => {
    const ref = Firebase.database().ref(`users/${uid}/projects`);
    ref.on('child_added', (data) => {
      dispatch(getProject(data.key));
      dispatch(getCards(data.key));
    });
  };
}

function getProject(projectId) {
  return (dispatch) => {
    const ref = Firebase.database().ref(`projects/${projectId}`);
    ref.on('value', (data) => {
      return dispatch({
        type: GET_PROJECT,
        projectId,
        data: data.val(),
      })
    });
  }
}

function getCards(projectId) {
  return (dispatch) => {
    const ref = Firebase.database().ref(`cards/${projectId}`);
    ref.on('child_added', (data) => {
      return dispatch({
        type: GET_CARD,
        projectId,
        cardId: data.key,
        data: data.val(),
      })
    });
    ref.on('child_changed', (data) => {
      return dispatch({
        type: GET_CARD,
        projectId,
        cardId: data.key,
        data: data.val(),
      })
    });
  };
}

export function createProject(uid) {
  const newProjectRef = Firebase.database().ref(`projects`).push();
  newProjectRef.set({
    id: newProjectRef.key,
    collaborators: {
      [uid]: true,
    },
  });

  Firebase.database().ref(`users/${uid}/projects`).update({
    [newProjectRef.key]: true,
  });
}

export function createTextCard(projectId) {
  const projectRef = Firebase.database().ref(`cards/${projectId}`);
  const newCardRef = projectRef.push();
  newCardRef.set({
    type: 'text',
    projectId,
    id: newCardRef.key,
  });
}

export function changeCardTitle(card, newTitle) {
  Firebase.database().ref(`cards/${card.projectId}/${card.id}/title`).set(newTitle);
}

export function changeProjectTitle(projectId, newTitle) {
  Firebase.database().ref(`projects/${projectId}/title`).set(newTitle);
}

const initialState = {

};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        [action.projectId]: {
          ...state[action.projectId],
          ...action.data,
        },
      };
    case GET_CARD:
    case CHANGE_CARD:
      return {
        ...state,
        [action.projectId]: {
          ...state[action.projectId],
          cards: {
            ...state[action.projectId].cards,
            [action.cardId]: action.data,
          },
        },
      };
    default:
      return state;
  }
}
