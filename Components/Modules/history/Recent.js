import React, { Component } from 'react';
import {connect, compose} from 'react-redux'
import { ScrollView, View, Text, Button, AsyncStorage} from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import { NavigationActions} from 'react-navigation';

class Recent extends Component {
  state = { listRec : [] }

  componentDidMount(){
    AsyncStorage.getItem('@recent:num').then( res => {
      if( res !== null )
        this.setState({ listRec : JSON.parse(res) })
    })
    .catch( error => console.log('error!') )
  }

  componentWillUpdate( nextProps, nextState ){
    if( nextProps !== this.props )
    AsyncStorage.getItem('@recent:num').then( res => {
      if (res !== null) {
        this.setState({listRec : JSON.parse(res)})
      }
    } )
    .catch( error => console.log('error!') )
  }

  static navigationOptions = {
    title : 'Recent',
    tabBarLabel: 'Historique',
    tabBarIcon : ( { focused, tintColor } ) => <Icon name='history' type='material-community'
    color={focused ? '#888' : tintColor } />
  }

  removeList = () => {
    AsyncStorage.removeItem('@recent:num')
    this.setState({ listRec : [] })
  }

  render() {
    let list = this.state.listRec.map((e, i) => {
      return <ListItem key={'rec-'+i} title={e} onPress={ () => this.props.go("LeCantique", e.toString() )} />
    })
    return (
      <ScrollView>
        <Text>Récemment vu</Text>
        <List>
          {list}
        </List>
        <Icon name='delete' onPress={ this.removeList } />
      </ScrollView>
    );
  }
}

export default connect(
  (state) => ({state}),
  (dispatch, { navigation }) => {
    return{
      go: (route, id) => navigation.dispatch(NavigationActions.navigate({ routeName: route, params: id, action : dispatch(NavigationActions.navigate({routeName: route, params: id}) ) }))
    }
  }
)(Recent);
