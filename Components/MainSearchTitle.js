import React, { Component } from 'react';

import { View, Text, TextInput, Switch, ScrollView} from 'react-native';
import { Icon, List, ListItem, Button, SearchBar } from 'react-native-elements'
// import PadNum from './PadNum/PadNum'
// import ButtonRows from './PadNum/ButtonRows'
// import ButtonAnime from './ButtonAnime/ButtonAnime'

import {connect} from 'react-redux'
import { bindActionCreators, compose } from 'redux';
import { NavigationActions } from 'react-navigation';
import { firebaseConnect } from 'react-redux-firebase'

class MainSearchTitle extends Component {
  constructor(props){
    super(props)
      this.state = { id: '', toggle : false, number : 5, title:[] }
  }
  static navigationOptions = {
    title : 'Feony',
  }
  list = []

  txtSearch = (e) => {
    const { getList, firebase } = this.props;
    const { id } = this.state;
    const { TI_search} = this.refs //text input
    this.setState({number : 5 })
    getList(e, firebase)
  }

  componentWillReceiveProps(nextProps){
    if( nextProps.state !== this.props.state ){
      this.list = nextProps.state.listCantique
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps !== this.props || nextState !== this.state
  }

  render(){
    const { go, firebase, state, clearNum } = this.props
    let title
    let numero = state.Num.join('')

    var listCantique = this.list.map( ( e , i ) => {
      if(i < this.state.number)
        return <ListItem key={ e.id +'-'+ i } title={ e.id + '. '+e.titre } onPress={ () => { go("LeCantique", e.id) } } />
    })
    var loadMore = null
    var listShow = null
    if (listCantique.length > 1)
      loadMore = <ListItem title='LoadMore' onPress={ () => { this.setState({ number : this.state.number+5 }) } } />
    if (listCantique.length > 1)
      listShow = (<ScrollView style={{ width: '100%'}} >
        <List containerStyle={{ marginBottom: 20, width : '100%' }}>
          { listCantique }
          { loadMore }
        </List>
      </ScrollView>)

    return (<View style={{ width: '100%', flex: 2, justifyContent: 'flex-start', alignItems:'center' }}>
    <SearchBar
        clearIcon
        containerStyle={{ width: '100%', backgroundColor:'#fff' }}
        inputStyle={{ backgroundColor: 'white' }}
        placeholder = {'Entrez un titre'}
        ref='TI_search'
        onSubmitEditing = { this.txtSearch }
        onClear={() => this.setState({id : '' } )}
        onChangeText={ e => { this.setState({id : e } );this.txtSearch(e) } }
        autoFocus blurOnSubmit value={this.state.id}/>
    {listShow}
    </View>
  )
  }
}

export default compose(
  firebaseConnect([
    '/'
  ]),
  connect(
  (state) => ({
    state
  }),
  (dispatch, { navigation }) => {
    return {
      go: (route, id) => navigation.navigate({routeName: route, params: id, action : dispatch(NavigationActions.navigate({routeName: route, params: id})) }),
      getList : (txt, firebase) => dispatch({ type:'GET_LIST_BY_TITLE',  id: txt, firebase : firebase}),
      clearNum : () => dispatch({type:'CLEAR_NUM'})
      }
  }
))(MainSearchTitle);
