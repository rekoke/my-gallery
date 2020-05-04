import * as firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBT6wEhjj15PL1hwZVpF-bV5pdGIe7bmJs',
  authDomain: 'gallery-adbfd.firebaseapp.com',
  databaseURL: 'https://gallery-adbfd.firebaseio.com',
  projectId: 'gallery-adbfd',
  storageBucket: 'gallery-adbfd.appspot.com',
  messagingSenderId: '167495151798',
  appId: '1:167495151798:web:1581767449b3a8fd063617',
  measurementId: 'G-2NLYL9TTMJ',
};
firebase.initializeApp(firebaseConfig);

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .catch(function(error) {
    console.log('error-->', error);
  });

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();
