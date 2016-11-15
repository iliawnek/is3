import Firebase from 'firebase';

const OPEN_PROJECTS_LIST = 'is3/ui/OPEN_PROJECTS_LIST';
const CLOSE_PROJECTS_LIST = 'is3/ui/CLOSE_PROJECTS_LIST';
const OPEN_ACTIVITY_LOG = 'is3/ui/OPEN_ACTIVITY_LOG';
const CLOSE_ACTIVITY_LOG = 'is3/ui/CLOSE_ACTIVITY_LOG';
const GET_CURRENT_PROJECT_ID = 'is3/ui/GET_CURRENT_PROJECT_ID';
const DISPLAY_NOTIFICATION = 'is3/ui/DISPLAY_NOTIFICATION';
const HIDE_NOTIFICATION = 'is3/ui/HIDE_NOTIFICATION';

export function openProjectsList() {
  return {type: OPEN_PROJECTS_LIST};
}
export function closeProjectsList() {
  return {type: CLOSE_PROJECTS_LIST};
}
export function openActivityLog() {
  return {type: OPEN_ACTIVITY_LOG};
}
export function closeActivityLog() {
  return {type: CLOSE_ACTIVITY_LOG};
}

export function setCurrentProjectId(uid, projectId) {
  Firebase.database().ref(`users/${uid}/currentProjectId`).set(projectId);
}

export function getCurrentProjectId(uid) {
  return dispatch => {
    Firebase.database().ref(`users/${uid}/currentProjectId`).on('value', data => {
      dispatch({
        type: GET_CURRENT_PROJECT_ID,
        projectId: data.val(),
      })
    })
  };
}

let lastTimeout;

export function displayNotification(props) {
  return dispatch => {
    dispatch({
      type: DISPLAY_NOTIFICATION,
      props: {...props, isActive: true},
    });
    clearTimeout(lastTimeout);
    lastTimeout = setTimeout(() => {
      dispatch(hideNotification());
    }, 8000);
  };
}

export function hideNotification() {
  return {type: HIDE_NOTIFICATION};
}

const initialState = {
  projectsListOpen: false,
  activityLogOpen: false,
  currentProjectId: null,
};

export default function ui(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_PROJECTS_LIST:
      return {
        ...state,
        projectsListOpen: true,
      };
    case CLOSE_PROJECTS_LIST:
      return {
        ...state,
        projectsListOpen: false,
      };
    case OPEN_ACTIVITY_LOG:
      return {
        ...state,
        activityLogOpen: true,
      };
    case CLOSE_ACTIVITY_LOG:
      return {
        ...state,
        activityLogOpen: false,
      };
    case GET_CURRENT_PROJECT_ID:
      return {
        ...state,
        currentProjectId: action.projectId,
      };
    case DISPLAY_NOTIFICATION:
      return {
        ...state,
        notification: action.props,
      };
    case HIDE_NOTIFICATION:
      return {
        ...state,
        notification: {...state.notification, isActive: false},
      };
    default:
      return state;
  }
}
