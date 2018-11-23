import React, { Component } from 'react';
import {connect} from 'react-redux';
import { View, Text, Button, AsyncStorage} from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

class Favori extends Component {
  state = { listFav : [] }
  componentDidMount(){
    AsyncStorage.getItem('@favorite').then( res => {
      if( res !== null )
        this.setState({ listFav : JSON.parse(res) })
    })
    .catch( error => console.log('error!') )
  }

  componentWillUpdate( nextProps, nextState ){
    // console.log('update');
    if( nextProps !== this.props )
      AsyncStorage.getItem('@favorite').then( res => {
        if (res !== null) {
          this.setState({listFav : JSON.parse(res)})
        }
      } )
      .catch( error => console.log('error!') )
  }

  removeList = () => {
    AsyncStorage.removeItem('@favorite')
    this.setState({ listFav : [] })
  }

  static navigationOptions = {
    title : 'Favori',
    tabBarIcon : ( { focused, tintColor } ) => <Icon name='heart-outline' type='material-community'
    color={focused ? '#888' : tintColor } />
  }

  render() {
    let listFFPM = this.state.listFav.map((e, i) => {
      return <ListItem key={'rec-'+i} title={e} onPress={()=> this.props.go("LeCantique", e )} />
    })
    return (
      <View>
        <Text> Cantiques préférés </Text>
        <Text> FFPM </Text>
        <List>
          {listFFPM}
        </List>
        <Text> TSANTA </Text>
        <List>

        </List>
        <Text> ANTEMA </Text>
        <List>

        </List>
        <Text> FIHIRANA FANAMPINY </Text>
        <List>

        </List>
        <Icon name='delete' onPress={ this.removeList } />
      </View>
    );
  }
}

export default connect(
state => ({ state }),
(dispatch, { navigation }) => {
  return{
    go: (route, id) => navigation.dispatch(NavigationActions.navigate({routeName: route, params: id, action : dispatch(NavigationActions.navigate({routeName: route, params: id})) }))
  }
}
)(Favori);
