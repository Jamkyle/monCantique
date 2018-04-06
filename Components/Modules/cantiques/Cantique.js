import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableNativeFeedback,TouchableWithoutFeedback, AsyncStorage, Button} from 'react-native';
import _ from 'lodash'
import {getVal} from 'react-redux-firebase'
import { Icon } from 'react-native-elements';

class Cantique extends Component {
  static navigationOptions = {
    title: 'Le Cantique'
  }
  state = {
    hira : '', size : 14
  }
  double = true
  lastPress = 0
  componentWillMount(){
    const { navigation, getTrad, firebase } = this.props
    let id = navigation.state.params|0
    getTrad( id, firebase)
    this.storeIn( id, '@recent:num' )
  }

  storeIn( val, key ){
    AsyncStorage.getItem(key).then(e => {
      let arr = [val.toString()]
      let el = JSON.parse(e)
      if ( val !== 0 && val !== null && val.toString().indexOf('Num') < 0 && val.toString().match(/\d+/) !== null ) {
        if (el !== null) {
          if ( !el.includes(val.toString()) ) {
            arr = [val.toString(), ...el]
            AsyncStorage.setItem( key, JSON.stringify(arr) )
            .then( json => console.log('success! '+key) )
            .catch(error => console.log('error!'));
          }
        }else {
          AsyncStorage.setItem( key, JSON.stringify(arr) )
          .then( json => console.log('success first! '+key) )
          .catch(error => console.log('error!'));
        }
      }
    })
  }

  componentWillReceiveProps( nextProps ){
    const { aCantique, traduction } = nextProps.state
    const { navigation } = nextProps
    if(nextProps.state !== this.props.state && aCantique.cantique !== {})
      {
        this.storeIn( navigation.state.params, '@recent:num')
      }
        this.setState({ hira : aCantique.cantique })
      // if(aCantique.cantique !== null && this.props.traduction !== null){
        // hira = aCantique.cantique.toString().split(/(?=[1-9])/g).map((e, i, arr ) => { return <Text key={'c-'+i}> { e } { arr.length -1 === i && '\r\n\n' }{ i+1 +'. '+ traduction.strophe[0].trad.toString() + '\r\n\r\n' }</Text> })
      // }
  }

  _press = (e) => {
    const { aCantique, traduction } = this.props.state
    const time = new Date().getTime();
  	const delta = time - this.lastPress;
  	const DOUBLE_PRESS_DELAY = 300;

  	if (delta < DOUBLE_PRESS_DELAY) {
  		// Success double press
      this.double = !this.double
  	}
	   this.lastPress = time;

    if( this.double === false ){
      this.setState({ hira : traduction.strophe[0].trad})
    }
    else {
      this.setState({ hira : aCantique.cantique })
    }

  }
  _addFavori = () => {
    const { navigation, doList } = this.props
    this.storeIn( navigation.state.params, '@favorite')
    doList()
  }

  _changeSize = (e) => {
      if(e === 'in' ){
        if(this.state.size <= 20)
          this.setState({size : this.state.size + 2})
      }
      else {
        if( this.state.size >= 10)
          this.setState({size : this.state.size - 2})
      }
  }

  render() {
    const { hira, size } = this.state
    const { navigation, getTrad } = this.props
    let id
      id = navigation.state.params|0
    return (
      <View style={{ height : '100%', alignItems: 'center', }}>
        <ScrollView style={{ width : '88%' }}>
          <TouchableWithoutFeedback onPress={ this._press } >
            <View style={{  alignItems: 'center', justifyContent: 'center' }}>
              <Text> { id } </Text>
              <Text style={{ fontSize : size, textAlign:'center'  }} > { hira } </Text>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View style={{ bottom : 0, flexDirection:'row' }}>
          <Button title='A+' style={ styles.button } onPress={ () => this._changeSize('in') } />
          <Button title='A-' style={ styles.button } onPress={ () => this._changeSize('out') } />
          <Icon name='favorite-border' style={ styles.button } onPress={ () => this._addFavori() } />
        </View>
      </View>

    );
  }
}
const styles ={
  button :{
    width : 10,
    marginRight : 10
  }
}

export default Cantique;
