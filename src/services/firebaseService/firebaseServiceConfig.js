const prodConfig = {
  // apiKey           : "YOUR_API_KEY",
  // authDomain       : "your-app.firebaseapp.com",
  // databaseURL      : "https://your-app.firebaseio.com",
  // projectId        : "your-app",
  // storageBucket    : "your-app.appspot.com",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
};

const devConfig = {
  apiKey: 'AIzaSyA7Jn6mRDzSflx2d0PMdj23RY74Mja-0C4',
  authDomain: 'wuay-488a1.firebaseapp.com',
  projectId: 'wuay-488a1',
  storageBucket: 'wuay-488a1.appspot.com',
  messagingSenderId: '797756465974',
  appId: '1:797756465974:web:722c18446c9dba46c3c997',
  measurementId: 'G-WWYWHRQ5GQ',
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
