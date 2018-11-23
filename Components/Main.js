import React, { Component } from 'react';
import {connect} from 'react-redux'
import { View, Text, TextInput, Switch, ScrollView} from 'react-native';
import { Icon, List, ListItem, Button, SearchBar } from 'react-native-elements'
import PadNum from './PadNum/PadNum'
import ButtonRows from './PadNum/ButtonRows'
import ButtonAnime from './ButtonAnime/ButtonAnime'

class Main extends Component {

  constructor(props){
    super(props)
      this.state = { id: '', toggle : false, number : 5, permut : this.Permut.num, title:[] }
  }

  list = []

  static navigationOptions = {
    title: 'Feony',
  }

  numSearch = (params) => {
    const { go, state } = this.props;
    // const { id } = this.state;
    let id = state.Num.join('')
    // const { TI_search } = this.refs //text input
    // TI_search.blur() //blur textInput
    this.setState({ number : 5 })
    if(id !== null && id !== '' && id.match(/\d+/) !== null && id !== 0 )
      go("LeCantique", params+id)
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
      title : 'par num',
      placeholder : 'Entrez le numéro',
      func : this.numSearch,
      limitCar : 3,
      typeKey : 'numeric'
    },
    txt : {
      title : 'par titre',
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
    this.setState({ toggle : e, permut : permut, id: '' })
  }

  componentWillReceiveProps(nextProps){
    if( nextProps.state !== this.props.state ){
      this.list = nextProps.state.listCantique

      let numero = nextProps.state.Num.join('')

      if(numero > 51)
        this.setState({title : ['FFPM']})
      else if (numero > 24)
        this.setState({title :  ['FFPM','FF']})
      else if (numero > 12)
        this.setState({title : ['FFPM','TS','FF']})
      else if (numero > 0)
        this.setState({title : ['FFPM','TS','AN','FF']})
      else {
        this.setState({title : []})
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return nextProps !== this.props || nextState !== this.state
  }

  render() {
    const { go, firebase, state, clearNum } = this.props
    let title
    let numero = state.Num.join('')

    var listCantique = this.list.map( ( e , i ) => {
      if(i < this.state.number)
        return <ListItem key={ e.id +'-'+ i } title={ e.id + '. '+e.titre } onPress={ () => { go("LeCantique", e.id, this.state.title) } } />
    })
    var loadMore = null
    var listShow = null
    let buttons = this.state.title.map((i, e, arr) => {
      return <ButtonAnime key={i} title={i} buttonStyle={Styles.ButtonAnime} color={Styles.Colors[i]} arr={arr} index={e} onPress={ this.numSearch }/>
    })
    if (listCantique.length > 1)
      listShow = (<ScrollView style={{ width: '100%'}} >
        <List containerStyle={{ marginBottom: 20, width : '100%' }}>
          { listCantique }
          { loadMore }
        </List>
      </ScrollView>)
    if (listCantique.length > 1)
      loadMore = <ListItem title='LoadMore' onPress={ () => { this.setState({ number : this.state.number+5 }) } } />
    return (
      <View style={{ width: '100%', flex: 2, justifyContent: 'center', alignItems: 'center' }}>

        <View style={{ flexDirection:'row'}}>
          <View style={{ ...Styles.TextBorder, flexDirection:'row', justifyContent: 'center' }}>
            <Text style={{ fontSize : 40, height:50}}>{ numero }</Text>
          </View>
          <Icon name='clear' onPress={clearNum}/>
        </View>
        <View style={{flex:2}}>
          <PadNum />
        </View>

        <View style={{ flexDirection:'row', flex: 1, marginTop:50}}>
          {buttons}
          {/*<ButtonRows value={this.state.title} size={13} buttonStyle={Styles.Button} colors={Styles.Colors} onPress={ this.numSearch }/>*/}
        </View>
      {
        // <SearchBar
        //     clearIcon
        //     lightTheme
        //     containerStyle={{ width: '100%' }}
        //     inputStyle={{ backgroundColor: 'white' }}
        //     placeholder = {this.state.permut.placeholder}
        //     ref='TI_search'
        //     keyboardType= { this.state.permut.typeKey }
        //     maxLength = {this.state.permut.limitCar}
        //     onSubmitEditing = { this.state.permut.func }
        //     onClear={() => this.setState({id : '' } )}
        //     onChangeText={ (text) => this.setState({id : text } )}
        //     autoFocus blurOnSubmit value={this.state.id}/>
        //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        //       <Text>Num  </Text>
        //       <Switch onValueChange={ this._handleToggle } value={ this.state.toggle } onTintColor={'#eee'} />
        //       <Text>  Titre</Text>
        //     </View>
        // <Button
        //   title='GO'
        //   onPress={ this.state.permut.func }
        // />
      }
      </View>
    );
  }
}

const Styles ={
  Button : {
    borderRadius : '60%',
    width: '10%', height: '10%',
    marginTop: 50
  },
  ButtonAnime :{
    borderRadius : 100,
    width: 70, height: 70,
  },
  Colors : {
    FFPM : {backgroundColor : '#779'},
    TS : {backgroundColor : '#99b'},
    AN : {backgroundColor : '#bbd'},
    FF : {backgroundColor : '#ddf'},
  },
  TextBorder : {
    marginLeft: 20,
    borderColor: 'black',
    borderBottomWidth: 1,
    width : 250
  }
}


export default Main
