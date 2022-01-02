import firebase from 'firebase/app';
import 'firebase/auth';
// require('firebase/auth');

const devConfig = {
  apiKey: 'AIzaSyA7Jn6mRDzSflx2d0PMdj23RY74Mja-0C4',
  authDomain: 'wuay-488a1.firebaseapp.com',
  projectId: 'wuay-488a1',
  storageBucket: 'wuay-488a1.appspot.com',
  messagingSenderId: '797756465974',
  appId: '1:797756465974:web:722c18446c9dba46c3c997',
  measurementId: 'G-WWYWHRQ5GQ',
};

firebase.initializeApp(devConfig);
// console.log('auth', firebase.auth);
const auth = firebase.auth();

export { auth, firebase };
