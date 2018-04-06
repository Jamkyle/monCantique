import React, { Component } from 'react';
import { View, Text, TextInput, Switch, ScrollView} from 'react-native';
import { Icon, List, ListItem, Button, SearchBar } from 'react-native-elements'


class Main extends Component {
  constructor(props){
    super(props)
      this.state = { id: '', toggle : false, number : 5, permut : this.Permut.num }
  }
  list = []
  static navigationOptions = {
    title: 'Recherche',
    tabBarIcon : ( { focused, tintColor } ) => <Icon name='search'
    color={focused ? '#888' : tintColor }/>,
  }
  numSearch = () => {
    const { go, } = this.props;
    const { id } = this.state;
    const { TI_search } = this.refs //text input
    TI_search.blur()
    this.setState({number : 5 })
    if(id !== null && id !== "" )
      go("LeCantique", id)
  }

  txtSearch = () => {
    const { getList, firebase } = this.props;
    const { id } = this.state;
    const { TI_search} = this.refs //text input
    TI_search.blur()
    this.setState({number : 5 })
    getList(id, firebase)
  }

  Permut = {
    num : {
      title : 'recherche par numéros',
      placeholder : 'Entrez le numéro',
      func : this.numSearch,
      limitCar : 3,
      typeKey : 'numeric'
    },
    txt : {
      title : 'recherche par titre',
      placeholder : 'Entrez le titre',
      limitCar : 120,
      func : this.txtSearch,
      typeKey : 'default'
    }
  }

  _handleToggle = (e) => {
    let permut = {}
    if(e === true){
      permut = this.Permut.txt
    }else {
      permut = this.Permut.num
    }
    this.setState({ toggle : e, permut : permut })
  }

  componentWillReceiveProps(nextProps){
    if( nextProps.state !== this.props.state ){
      this.list = nextProps.state.listCantique
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps !== this.props || nextState !== this.state
  }

  render() {
    const { go, firebase } = this.props
    var listCantique = this.list.map( ( e , i ) => {
      if(i < this.state.number)
        return <ListItem key={e.id +'-'+ i} title={e.id + '. '+e.titre} onPress={ () => { go("LeCantique", e.id) } } />
    })
    var loadMore = null
    if (listCantique.length > 1)
      loadMore = <ListItem title='LoadMore' onPress={ () => { this.setState({ number : this.state.number+5 }) } } />
    return (
      <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>Num  </Text>
          <Switch onValueChange={ this._handleToggle } value={ this.state.toggle } onTintColor={'#aaa'}/>
          <Text>  Text</Text>
        </View>
        <Text>{this.state.permut.title}</Text>
          <SearchBar
            clearIcon
            lightTheme
            containerStyle={{ width: '100%' }}
            inputStyle={{ backgroundColor: 'white' }}
            placeholder = {this.state.permut.placeholder}
            ref='TI_search'
            keyboardType= { this.state.permut.typeKey }
            maxLength = {this.state.permut.limitCar}
            onEndEditing = { this.state.permut.func }
            onClear={() => this.setState({id : '' } )}
            onChangeText={ (text) => this.setState({id : text } )}
            autoFocus blurOnSubmit/>
        <ScrollView style={{ width: '100%'}} >
          <List containerStyle={{ marginBottom: 20, width : '100%' }}>
            { listCantique }
            { loadMore }
          </List>
        </ScrollView>
      </View>
    );
  }
}


export default Main
