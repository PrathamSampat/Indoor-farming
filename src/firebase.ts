import firebase from 'firebase'
import config from './firebaseConfig'


const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()

const firestore = app.firestore()
const auth = app.auth()
const realtime = app.database()


export {firestore, auth, realtime}