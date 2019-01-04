const initialState = {
  projects: [
    { id: '1', title: 'help me find peach', content: 'blah blah blah' },
    { id: '2', title: 'collect the all stars', content: 'blahblahblah' },
    { id: '3', title: 'egg hunt with yoshi', content: 'blah blah blah' },
  ],
}

export const createProject = project => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  // make async call to database

  // get reference to our firestore db
  const firestore = getFirestore()
  const profile = getState().firebase.profile
  const authorId = getState().firebase.auth.uid
  firestore
    .collection('projects')
    .add({
      ...project, // project has title, content
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date(),
    })
    .then(() => {
      dispatch({ type: 'CREATE_PROJECT', project })
    })
    .catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', err })
    })
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT':
      console.log('create project', action.project)
      return state
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error', action.err)
      return state
    default:
      return state
  }
}
