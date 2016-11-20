import Firebase from 'firebase';

const GET_PROJECT = 'is3/projects/GET_PROJECT';
const REMOVE_PROJECT = 'is3/projects/REMOVE_PROJECT';
const GET_CARD = 'is3/projects/GET_CARD';
const CHANGE_CARD = 'is3/projects/CHANGE_CARD';
const REMOVE_CARD = 'is3/projects/REMOVE_CARD';
const GET_TASK = 'is3/projects/GET_TASK';
const CHANGE_TASK = 'is3/projects/CHANGE_TASK';
const REMOVE_TASK = 'is3/projects/REMOVE_TASK';
const GET_COLLABORATOR = 'is3/projects/GET_COLLABORATOR';
const GET_UID_FROM_EMAIL = 'is3/projects/GET_UID_FROM_EMAIL';
const ADDING_COLLABORATOR_RESET = 'is3/projects/ADDING_COLLABORATOR_RESET';
const ADDING_COLLABORATOR_WAITING = 'is3/projects/ADDING_COLLABORATOR_WAITING';
const ADDING_COLLABORATOR_SUCCESS = 'is3/projects/ADDING_COLLABORATOR_SUCCESS';
const ADDING_COLLABORATOR_FAILURE = 'is3/projects/ADDING_COLLABORATOR_FAILURE';

export function getProjects(uid) {
  return (dispatch) => {
    const ref = Firebase.database().ref(`users/${uid}/projects`);
    ref.on('child_added', (data) => {
      dispatch(getProject(data.key));
      dispatch(getCards(data.key));
    });
    ref.on('child_removed', data => {
      dispatch({type: REMOVE_PROJECT, id: data.key})
    })
  };
}

function getProject(projectId) {
  return (dispatch, getState) => {
    const ref = Firebase.database().ref(`projects/${projectId}`);
    ref.on('value', data => {
      if (data.val()) {
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
      }
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
      const cardId = data.key;
      dispatch({
        type: GET_CARD,
        projectId,
        cardId,
        data: data.val(),
      });
      if (data.val().type === 'checklist') {
        dispatch(getTasks(projectId, cardId))
      }
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

function getTasks(projectId, cardId) {
  return dispatch => {
    Firebase.database().ref(`tasks/${cardId}`).on('child_added', (data) => {
      dispatch({
        type: GET_TASK,
        projectId,
        cardId,
        taskId: data.key,
        data: data.val(),
      });
    });
    Firebase.database().ref(`tasks/${cardId}`).on('child_changed', (data) => {
      dispatch({
        type: CHANGE_TASK,
        projectId,
        cardId,
        taskId: data.key,
        data: data.val(),
      });
    });
    Firebase.database().ref(`tasks/${cardId}`).on('child_removed', (data) => {
      dispatch({
        projectId,
        cardId,
        type: REMOVE_TASK,
        id: data.key,
      });
    });
  }
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

export function createChecklistCard(projectId) {
  const projectRef = Firebase.database().ref(`cards/${projectId}`);
  const newCardRef = projectRef.push();
  newCardRef.set({
    type: 'checklist',
    projectId,
    id: newCardRef.key,
  });
  const newTaskRef = Firebase.database().ref(`tasks/${newCardRef.key}`).push();
  newTaskRef.set({
    id: newTaskRef.key,
    checked: false,
  });
}

export function createImageCard(projectId, file) {
  const projectRef = Firebase.database().ref(`cards/${projectId}`);
  const newCardRef = projectRef.push();
  const storageRef = Firebase.storage().ref();
  const uploadTask = storageRef.child(newCardRef.key).put(file);
  newCardRef.set({
    type: 'image',
    projectId,
    id: newCardRef.key,
    title: file.name,
    uploadPercentage: 0,
  }).then(() => {
    uploadTask.on('state_changed', snapshot => {
      const uploadPercentage = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      newCardRef.update({uploadPercentage});
    });
  });
}

export function createTask(cardId) {
  const newTaskRef = Firebase.database().ref(`tasks/${cardId}`).push();
  newTaskRef.set({
    id: newTaskRef.key,
    checked: false,
  })
}

export function completeTask(cardId, taskId) {
  Firebase.database().ref(`tasks/${cardId}/${taskId}/checked`).set(true);
}

export function uncompleteTask(cardId, taskId) {
  Firebase.database().ref(`tasks/${cardId}/${taskId}/checked`).set(false);
}

export function changeTaskTitle(cardId, taskId, newTitle) {
  Firebase.database().ref(`tasks/${cardId}/${taskId}/title`).set(newTitle);
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

export function addCollaborator(email, projectId) {
  return dispatch => {
    dispatch({type: ADDING_COLLABORATOR_WAITING});
    Firebase.database().ref('users').once('value', data => {
      const users = data.val();
      const uid = Object.keys(users).filter(uid => users[uid].email === email)[0];
      if (uid) {
        Firebase.database().ref(`users/${uid}/projects/${projectId}`).set(true);
        Firebase.database().ref(`projects/${projectId}/collaborators/${uid}`).set(true);
        dispatch({type: ADDING_COLLABORATOR_SUCCESS});
      } else {
        dispatch({type: ADDING_COLLABORATOR_FAILURE});
      }
    });
  }
}

export function resetAddCollaboratorFlags() {
  return dispatch => {
    dispatch({type: ADDING_COLLABORATOR_RESET});
  };
}

export function deleteProject(project) {
  Firebase.database().ref(`projects/${project.id}`).remove();
  Object.keys(project.collaborators).forEach(uid => {
    Firebase.database().ref(`users/${uid}/projects/${project.id}`).remove();
  });
}

const initialState = {
  collaborators: {},
  addCollaboratorFlags: {
    waiting: false,
    success: false,
    failure: false,
  },
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
    case REMOVE_PROJECT:
      return {
        ...state,
        [action.id]: undefined
      };
    case GET_CARD:
    case CHANGE_CARD:
      return {
        ...state,
        [action.projectId]: {
          ...state[action.projectId],
          cards: {
            ...state[action.projectId].cards,
            [action.cardId]: {
              tasks: state[action.projectId].cards && state[action.projectId].cards[action.cardId] && state[action.projectId].cards[action.cardId].tasks,
              ...action.data,
            },
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
    case GET_TASK:
    case CHANGE_TASK:
      return {
        ...state,
        [action.projectId]: {
          ...state[action.projectId],
          cards: {
            ...state[action.projectId].cards,
            [action.cardId]: {
              ...state[action.projectId].cards[action.cardId],
              tasks: {
                ...state[action.projectId].cards[action.cardId].tasks,
                [action.taskId]: action.data,
              }
            },
          },
        },
      };
    case REMOVE_TASK:
      return {
        ...state,
        [action.projectId]: {
          ...state[action.projectId],
          cards: {
            ...state[action.projectId].cards,
            [action.cardId]: {
              ...state[action.projectId].cards[action.cardId],
              tasks: {
                ...state[action.projectId].cards[action.cardId].tasks,
                [action.taskId]: undefined,
              }
            },
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
    case ADDING_COLLABORATOR_RESET:
      return {
        ...state,
        addCollaboratorFlags: {
          waiting: false,
          success: false,
          failure: false,
        },
      };
    case ADDING_COLLABORATOR_WAITING:
      return {
        ...state,
        addCollaboratorFlags: {
          waiting: true,
          success: false,
          failure: false,
        },
      };
    case ADDING_COLLABORATOR_SUCCESS:
      return {
        ...state,
        addCollaboratorFlags: {
          waiting: false,
          success: true,
          failure: false,
        },
      };
    case ADDING_COLLABORATOR_FAILURE:
      return {
        ...state,
        addCollaboratorFlags: {
          waiting: false,
          success: false,
          failure: true,
        },
      };
    default:
      return state;
  }
}
