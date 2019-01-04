import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
  // indentify which backend to connect. Don't worry about this being visible on the browser.
  apiKey: 'AIzaSyC-dqXw8Yr-uZULCXQsBit6NtvK05RpDaM',
  authDomain: 'taneba-marioplan.firebaseapp.com',
  databaseURL: 'https://taneba-marioplan.firebaseio.com',
  projectId: 'taneba-marioplan',
  storageBucket: 'taneba-marioplan.appspot.com',
  messagingSenderId: '1058397118440',
}
firebase.initializeApp(config)

// initializing the firestore and add settings
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase
