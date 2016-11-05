import Firebase from 'firebase';

const GET_PROJECT = 'is3/projects/GET_PROJECT';

export function getProjects(uid) {
  return (dispatch) => {
    const ref = Firebase.database().ref(`users/${uid}/projects`);
    ref.on('child_added', (data) => {
      dispatch(getProject(data.key));
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

const initialState = {

};

export default function ui(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        [action.projectId]: action.data,
      };
    default:
      return state;
  }
}
