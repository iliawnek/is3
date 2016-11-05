import {combineReducers} from 'redux';
import auth from './auth';
import ui from './ui';
import projects from './projects';

export default combineReducers({
  auth,
  ui,
  projects,
});
