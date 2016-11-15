import Firebase from 'firebase';

const GET_PROJECT = 'is3/projects/GET_PROJECT';
const GET_CARD = 'is3/projects/GET_CARD';
const CHANGE_CARD = 'is3/projects/CHANGE_CARD';
const REMOVE_CARD = 'is3/projects/REMOVE_CARD';
const GET_COLLABORATOR = 'is3/projects/GET_COLLABORATOR';

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
  return (dispatch, getState) => {
    const ref = Firebase.database().ref(`projects/${projectId}`);
    ref.on('value', data => {
      Object.keys(data.val().collaborators).forEach(uid => {
        if (!getState().collaborators || !getState().collaborators[uid]) {
          dispatch(getCollaborator(uid));
        }
      });
      dispatch({
        type: GET_PROJECT,
        projectId,
        data: data.val(),
      });
    });
  }
}

function getCollaborator(uid) {
  return dispatch => {
    Firebase.database().ref(`users/${uid}`).on('value', data => {
      dispatch({
        type: GET_COLLABORATOR,
        data: {...data.val(), uid, projects: undefined},
      });
    });
  };
}

function getCards(projectId) {
  return (dispatch) => {
    const ref = Firebase.database().ref(`cards/${projectId}`);
    ref.on('child_added', (data) => {
      dispatch({
        type: GET_CARD,
        projectId,
        cardId: data.key,
        data: data.val(),
      })
    });
    ref.on('child_changed', (data) => {
      dispatch({
        type: CHANGE_CARD,
        projectId,
        cardId: data.key,
        data: data.val(),
      })
    });
    ref.on('child_removed', (data) => {
      dispatch({
        type: REMOVE_CARD,
        projectId,
        cardId: data.key,
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

  return newProjectRef.key;
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

export function deleteCard(card) {
  const cardRef = Firebase.database().ref(`cards/${card.projectId}/${card.id}`);
  cardRef.once('value', data => {
    console.log(data.val());
    Firebase.database().ref(`undo/${card.projectId}`).set(data.val());
  });
  cardRef.remove();
}

export function undoDeletion(projectId) {
  Firebase.database().ref(`undo/${projectId}`).once('value', data => {
    Firebase.database().ref(`cards/${projectId}/${data.val().id}`).set(data.val());
  });
}

const initialState = {
  collaborators: {},
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
    case REMOVE_CARD:
      return {
        ...state,
        [action.projectId]: {
          ...state[action.projectId],
          cards: {
            ...state[action.projectId].cards,
            [action.cardId]: undefined,
          },
        },
      };
    case GET_COLLABORATOR:
      return {
        ...state,
        collaborators: {
          ...state.collaborators,
          [action.data.uid]: action.data,
        }
      };
    default:
      return state;
  }
}
