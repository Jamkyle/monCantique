import React from 'react';
// import App from './Component/App'
import { StyleSheet, Text, View } from 'react-native';
import Routes from './Components/Routes';
import { Provider } from 'react-redux';
import {addNavigationHelpers} from 'react-navigation';
import Store from './Store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
          <Routes />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
