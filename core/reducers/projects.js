import Firebase from 'firebase';

const GET_PROJECT = 'is3/projects/GET_PROJECT';
const GET_CARD = 'is3/projects/GET_CARD';

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
        data: {...data.val(), id: projectId},
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
        data: {...data.val(), projectId, id: data.key},
      })
    });
  };
}

const initialState = {

};

export default function ui(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        [action.projectId]: {
          ...action.data,
          cards: {},
        },
      };
    case GET_CARD:
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
