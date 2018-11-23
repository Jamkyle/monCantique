import React, {Component} from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import MainContainer from './MainContainer';
import MainSearchTitle from './MainSearchTitle';
import CantiqueContainer from './Modules/cantiques/CantiqueContainer';
import Recent from './Modules/history/Recent';
import Favori from './Modules/history/Favori';
import Liturgie from './Modules/liturgie';
import TabBarCustom from './TabBarCustom/TabBarCustom'

const SearchTab = createMaterialTopTabNavigator({
    MainNum : MainContainer,
    MainTxt : MainSearchTitle,
  },
  {
    lazy : true,
    tabBarComponent: TabBarCustom,
    tabBarOptions : {
      labelStyle: {
        fontSize: 12,
        color : '#777',
      },
      ...Platform.select({
        ios : {
          activeTintColor: '#222',
          indicatorStyle: { backgroundColor: '#aaa' },
          style: { backgroundColor: 'white' },
          inactiveTintColor : '#ddd',
        },
        android : {
          activeTintColor: '#222',
          indicatorStyle: { backgroundColor: '#aaa' },
          style: { backgroundColor: 'white' },
          inactiveTintColor : '#ddd',
        }
      }),
    }
  }
)

const MainTab = createBottomTabNavigator({
  Home : {screen : SearchTab, navigationOptions: (e)=>{
      const {routes, index} = e.navigation.state
      return { tabBarIcon: <Icon name='home' color={ '#37a' }/> }
    } },
  Recent : Recent,
  Favori : Favori,
  Liturgie : Liturgie,
},{
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
  }
})

MainTab.navigationOptions = ({ navigation, props }) => {
  const { routes, index } = navigation.state;
// console.log(navigation.state);
  const navigationOptions = {};
 // here's an example, but you can dynamically define title
 // however you like given `routes` & `index`
 switch (routes[index].routeName) {
   case 'Home':
     navigationOptions.title = 'Feony'
     break;
   default:
    navigationOptions.title = 'Feony'

}
  return navigationOptions;
}

// const FFPMStack = createStackNavigator({
//   CantiqueFFPM : CantiqueContainer
// })
// const TSStack = createStackNavigator({
//   CantiqueTS : CantiqueContainer
// })
// const ANStack = createStackNavigator({
//   CantiqueAN : CantiqueContainer
// })
// const FFStack = createStackNavigator({
//   CantiqueFF : CantiqueContainer
// })
//
// const TabCantique = createMaterialTopTabNavigator({
//   ffpm : FFPMStack,
//   ts : {screen : TSStack},
//   an : ANStack,
//   ff : FFStack,
// })


const RouteStack = createStackNavigator({
  Main: MainTab,
  LeCantique : CantiqueContainer
},{
    initialRouteName: 'Main',
  }
);

const Routes = createAppContainer(RouteStack)

export default Routes
