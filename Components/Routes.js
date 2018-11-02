import React, {Component} from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom, HeaderBackButton } from 'react-navigation'; // 1.0.0-beta.11
import MainContainer from './MainContainer';
import CantiqueContainer from './Modules/cantiques/CantiqueContainer';
import Recent from './Modules/history/Recent';
import Favori from './Modules/history/Favori';
import Liturgie from './Modules/liturgie';

export const MainTab = TabNavigator({
  Main : {  screen: MainContainer },
  Recent : { screen : Recent },
  Favori : { screen : Favori},
  Liturgie : { screen : Liturgie, headerMode: 'none' },
},{
  swipeEnabled : true,
  tabBarOptions: {
    ...Platform.select({
      ios : {
        activeTintColor: '#888',
        indicatorStyle: { backgroundColor: '#aaa' },
        style: { backgroundColor: 'white' },
        inactiveTintColor : '#ddd',
      },
      android : {
        activeTintColor: '#888',
        indicatorStyle: { backgroundColor: '#aaa' },
        style: { backgroundColor: 'white' },
        inactiveTintColor : '#ddd',
      }
    }),
  },
  tabBarComponent: TabBarBottom,
  tabBarPosition : 'bottom'
})

const Routes = StackNavigator(
{
  Main: { screen: MainTab },
  LeCantique : {
    screen : CantiqueContainer,
    navigationOptions: ({ navigation }) => ({
      headerLeft : <HeaderBackButton title='Home' onPress={ () => navigation.popToTop() } />
    })
  }
});

export default Routes
