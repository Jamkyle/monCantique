import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import { View, Text, Button, AsyncStorage} from 'react-native';
import { Icon, List, ListItem, Header } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import Page from './components/Page'
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'


class Liturgie extends Component {
  state = { id : 1 }
  static navigationOptions = {
    title : 'Liturgie',
    tabBarIcon : ( { focused, tintColor } ) => <Icon name='bookmark' type='material-community'
    color={focused ? '#888' : tintColor } />
  }

  componentWillMount(){
    const { getPages, firebase } = this.props
    getPages( this.state.id , firebase )
  }

  componentWillReceiveProps( nextProps ){
    console.log(nextProps);
    const { pages } = nextProps.state
    const { navigation, getPages, firebase } = nextProps
    if( nextProps !== this.props ){
        this.setState({ id : nextProps.state.pages.id })
    }
  }

  render(){
    const { navigation, getPages, firebase } = this.props
    const { pages } = this.props.state
    return (
      <View>
        <Header
          innerContainerStyles ={{ justifyContent: 'space-around' }}
          outerContainerStyles={{ width : '100%', height: 40, backgroundColor: '#fff', ...styles.containerStyle }}
          leftComponent={ this.state.id > 1 ? <Icon name='keyboard-arrow-left' color='rgb(0, 47, 139)' onPress={ () => getPages( (parseInt(this.state.id)-1).toString(), firebase ) }/> : null }
          centerComponent={{ text : pages.title, style: {color :'rgb(0, 47, 139)'} }}
          rightComponent={ this.state.id < 23 ? <Icon name='keyboard-arrow-right' color='rgb(0, 47, 139)' onPress={ () => getPages( parseInt(this.state.id)+1, firebase ) }/> : null}
        />
        <Page content={pages.content} title={pages.title}/>
      </View>
    )
  }
}
const styles ={
  containerStyle: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#eee',
    borderBottomWidth: 0,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 5,
  }
}

export default compose(
  firebaseConnect([
    '/Liturgie'
  ]),
  connect(
  (state) => ({state}),
  (dispatch, { navigation }) => {
    return {
      getPages : ( id, firebase ) => dispatch({ type:'GET_PAGES',  id: id, firebase : firebase }),
      go: ( route, id ) => navigation.dispatch(NavigationActions.navigate({routeName: route, params: id }))
    }
  }
)
)(Liturgie);
