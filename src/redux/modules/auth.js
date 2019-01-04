const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('login error')
      return { ...state, authError: 'Login failed' }
    case 'LOGIN_SUCCESS':
      console.log('login success')
      return {
        ...state,
        authError: null,
      }
    case 'SIGNOUT_SUCCESS':
      console.log('signout success')
      return state
    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return { ...state, authError: null }
    case 'SIGNUP_ERROR':
      console.log('signup error')
      return { ...state, authError: action.err.message }
    default:
      return state
  }
}

export const signIn = credentials => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase()
  firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' })
    })
    .catch(err => {
      dispatch({ type: 'LOGIN_ERROR', err })
    })
}

export const signOut = () => (dispatch, getState, { getFirebase }) => {
  console.log('lets sign out')
  const firebase = getFirebase()
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    })
}

export const signUp = newUser => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase()
  const firestore = getFirestore()

  /**
   * 1. Create User with Firebase Auth Service
   * 2. Then add that user to the user collection on the Firestore with custom infomation
   */
  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(resp => {
      // user.uid is auto generated from firebase.auth()createUserWithEmailAndPassword
      // collection('users').add()としてしまうと、IDが作られてしまうが、今回はuidで作りたいので.docを使う
      return firestore
        .collection('users')
        .doc(resp.user.uid)
        .set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0],
        })
    })
    .then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS' })
    })
    .catch(err => {
      dispatch({ type: 'SIGNUP_ERROR', err })
    })
}
