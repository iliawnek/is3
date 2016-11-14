import Firebase from 'firebase';

const SIGN_IN_WAITING = 'is3/auth/SIGN_IN_WAITING';
const SIGN_IN_SUCCESS = 'is3/auth/SIGN_IN_SUCCESS';
const SIGN_IN_FAILURE = 'is3/auth/SIGN_IN_FAILURE';
const SIGN_OUT_WAITING = 'is3/auth/SIGN_OUT_WAITING';
const SIGN_OUT_SUCCESS = 'is3/auth/SIGN_OUT_SUCCESS';
const SIGN_OUT_FAILURE = 'is3/auth/SIGN_OUT_FAILURE';
const GET_USER = 'is3/auth/GET_USER';
const USER_NOT_FOUND = 'is3/auth/USER_NOT_FOUND';

export function signIn() {
  const waiting = () => ({type: SIGN_IN_WAITING});
  const success = () => ({type: SIGN_IN_SUCCESS});
  const failure = (error) => ({type: SIGN_IN_FAILURE, error});

  return dispatch => {
    dispatch(waiting());
    const provider = new Firebase.auth.GoogleAuthProvider();
    Firebase.auth().signInWithPopup(provider)
      .then(() => dispatch(success()))
      .catch(error => dispatch(failure(error)));
  };
}

export function signOut() {
  const waiting = () => ({type: SIGN_OUT_WAITING});
  const success = () => ({type: SIGN_OUT_SUCCESS});
  const failure = () => ({type: SIGN_OUT_FAILURE});

  return dispatch => {
    dispatch(waiting());
    Firebase.auth().signOut()
      .then(() => {
        location.reload();
      })
      .catch(() => dispatch(failure()));
  };
}

export function getUser() {
  return dispatch => {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({type: GET_USER, user});
        Firebase.database().ref(`users/${user.uid}/photo`).set(user.photoURL);
        Firebase.database().ref(`users/${user.uid}/email`).set(user.email);
        Firebase.database().ref(`users/${user.uid}/name`).set(user.displayName);
        dispatch({type: SIGN_IN_SUCCESS});
      } else {
        dispatch({type: USER_NOT_FOUND});
      }
    });
  };
}

const initialState = {
  user: null,
  signedIn: false,
  checkedForUser: false,
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case SIGN_IN_WAITING:
      return {
        ...state,
        signingIn: true,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        signingIn: false,
        signedIn: true,
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        signingIn: false,
        error: action.error,
      };

    case SIGN_OUT_WAITING:
      return {
        ...state,
        signingOut: true,
      };
    case SIGN_OUT_SUCCESS:
      return initialState;
    case SIGN_OUT_FAILURE:
      return initialState;

    case GET_USER:
      return {
        ...state,
        user: action.user,
        checkedForUser: true,
      };
    case USER_NOT_FOUND:
      return {
        ...state,
        checkedForUser: true,
      };

    default:
      return state;
  }
}
