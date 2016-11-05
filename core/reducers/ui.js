const OPEN_PROJECTS_LIST = 'is3/auth/OPEN_PROJECTS_LIST';
const CLOSE_PROJECTS_LIST = 'is3/auth/CLOSE_PROJECTS_LIST';
const OPEN_ACTIVITY_LOG = 'is3/auth/OPEN_ACTIVITY_LOG';
const CLOSE_ACTIVITY_LOG = 'is3/auth/CLOSE_ACTIVITY_LOG';

export function openProjectsList() {return {type: OPEN_PROJECTS_LIST};}
export function closeProjectsList() {return {type: CLOSE_PROJECTS_LIST};}
export function openActivityLog() {return {type: OPEN_ACTIVITY_LOG};}
export function closeActivityLog() {return {type: CLOSE_ACTIVITY_LOG};}

const initialState = {
  projectsListOpen: false,
  activityLogOpen: false,
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
    default:
      return state;
  }
}
