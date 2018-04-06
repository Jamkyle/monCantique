import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase } from 'react-redux-firebase'
import middleware from './middleware/middleware';
import reducers from './reducers';
import firebase from 'firebase'
import { AsyncStorage } from 'react-native'


const firebaseConfig = {
    apiKey: "AIzaSyD5VsOspNrkr7konEZwV6XYVWBRNhFWWBs",
    authDomain: "hiraapp-e0dac.firebaseapp.com",
    databaseURL: "https://hiraapp-e0dac.firebaseio.com"
    // projectId: "hiraapp-e0dac",
    // storageBucket: "hiraapp-e0dac.appspot.com",
    // messagingSenderId: "149820506791"
  }
  firebase.initializeApp(firebaseConfig)
// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
  ReactNative: { AsyncStorage }
}


const store = createStore(
  reducers,
  {},
  compose(
    reactReduxFirebase(firebase, config), applyMiddleware(...middleware))
  );

export default store;
