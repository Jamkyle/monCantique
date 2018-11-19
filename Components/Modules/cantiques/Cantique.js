import React, { Component } from 'react';
import { Modal, ScrollView, View, Text, TouchableNativeFeedback,TouchableWithoutFeedback, AsyncStorage, Animated} from 'react-native';
import { Button } from 'react-native-elements'
import _ from 'lodash'
import { Font } from 'expo'
import { getVal } from 'react-redux-firebase'
import { Icon, Header , Overlay, Slider} from 'react-native-elements';
import Strophes from './Strophes'

class Cantique extends Component {
  static navigationOptions = {
    title: 'Le Cantique',
    header : null
  }
  state = {
    hira : '', traduction:'', size : 14, color : '#082b4b', favorite : 'favorite-border', show : false, slideShow: false
  }
  font = {}
  double = true
  lastPress = 0

  componentWillMount(){
    const { navigation, getTrad, firebase, storeIn } = this.props
    let id = navigation.state.params|0
    getTrad( id, firebase)
    storeIn( id, '@recent:num' )
  }

  async componentDidMount(){
    this.getFav(this.props.navigation.state.params)
    await Font.loadAsync({
      'Montserrat' : require('../../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    });
    this.font = { fontFamily:'Montserrat' }
  }

  getFav(val){
    //indique si le cantique appartient au fav
    AsyncStorage.getItem('@favorite').then(e => {
      let el = JSON.parse(e)
      if( el !== null && el.includes( val.match(/\d+/)[0] ) )
        {
          this.setState({ favorite : 'favorite' })
        }
    })
  }

  componentWillReceiveProps( nextProps ){
    const { aCantique, traduction } = nextProps.state
    // console.log(aCantique);
    const { navigation, storeIn } = nextProps
    if(nextProps.state !== this.props.state && aCantique.cantique !== {})
      {
        storeIn( navigation.state.params, '@recent:num')
      }
    this.setState({ hira : aCantique.cantique, traduction: traduction.strophe[0].trad })
      // if(aCantique.cantique !== null && this.props.traduction !== null){
      //   hira = aCantique.cantique.toString().split(/(?=[1-9])/g).map((e, i, arr ) => { return <Text key={'c-'+i}> { e } { arr.length -1 === i && '\r\n\n' }{ i+1 +'. '+ traduction.strophe[0].trad.toString() + '\r\n\r\n' }</Text> })
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
      this.setState({ hira : traduction.strophe[0].trad, color : '#2e6ea8' })
    }
    else {
      this.setState({ hira : aCantique.cantique, color : '#082b4b' })
    }

  }

  _addFavori = () => {
    const { navigation, doList, storeIn } = this.props
    this.setState({favorite : 'favorite'})
    storeIn( navigation.state.params, '@favorite')
  }

  _changeSize = (e) => {
      if( e === 'in' ){
        if(this.state.size <= 20 )
          this.setState({size : this.state.size + 1})
      }
      else {
        if( this.state.size >= 10 )
          this.setState({size : this.state.size - 1})
      }
  }

  renderSlider = (show) => {
    if(show)
      return(
      <View style={{width:50, justifyContent:'center', alignItems:'center'}}>
          <Text style={{fontSize:20}} onPress={ ()=> this._changeSize('in')} ></Text>
              <Slider
                thumbStyle={{ backgroundColor:'#77F' }}
                style={{width:100}}
                orientation={'vertical'}
                minimumValue={10}
                maximumValue={20}
                onSlidingComplete={()=>this.setState({slideShow:false})}
                step={1}
                animateTransitions={true}
                animationType={'timing'}
                value={ this.state.size }
                onValueChange={ (value) => this.setState({ size: value }) }
              />
          <Text style={{fontSize:10}} onPress={ ()=> this._changeSize('out') }></Text>
        </View>
      )
  }

  render() {
    const { hira, size, color, traduction } = this.state
    const { navigation, getTrad, go, switchShow, state } = this.props
    let content
    let id
      id = state.Num.join('')
    let hiraTab = hira.split(/\r\n\r\n(?=[1-9])/g);
    let tradTab = traduction.split(/\n\n[1-9]./);

    content = hiraTab.map((e,i) => {
      return <Strophes content={e} trad={tradTab[i]} show={this.state.show} size={size} color={'#082b4b'} key={e.toString()+i}/>
    })
    //couper chaque strophe et imbriquer avec la trad

    return (
      <View style={{flex:1, height:'100%', justifyContent:'center', alignItems: 'center', marginTop:'15%' }}>
          <Header
            leftComponent={<Icon name='close' onPress={ () => navigation.popToTop() }/>}
            innerContainerStyles ={{ justifyContent: 'space-between' }}
            outerContainerStyles={{ width : '100%', height: '10%', backgroundColor:'rgba(0, 47, 139, 0)'}}
            centerComponent={{ text : id.toString(), style: {color :'rgb(0, 47, 139)', fontSize:30} }}
          />
          <Text>{}</Text>
          <View style={{flex:1, flexDirection:'row'}}>
            <ScrollView style={{ flex:1, width : '88%', marginLeft:50}}>
              <Text style={{color: '#a7a7a7', fontSize:9, textAlign:'center'}} > clique sur un vers pour voir la traduction </Text>
              <Icon name='touch-app' color='#aaa' size={12}/>
              { content }
            </ScrollView>
            <View style={{ marginRight :-25, height:'25%', flexDirection:'column', alignItems:'center', justifyContent:'space-between' }}>
              { <Button style={{flex:1, justifyContent:'center', width:50 }} fontSize={14} color={'#555'} buttonStyle={{...styles.police}} title={ !this.state.slideShow ? 'aA' : this.state.size.toString()} onPress={ ()=> this.setState({ slideShow: !this.state.slideShow }) } /> }
              {this.renderSlider(this.state.slideShow)}
            </View>
          </View>
            <Icon name={ this.state.favorite } style={ styles.button } onPress={ () => this._addFavori() } />
        </View>
    );
  }
}

const styles ={
  button :{
    width : 10,
    marginRight : 10
  },
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
    paddingBottom : 30
    // marginLeft: 5,
    // marginRight: 5,
  },
  police: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#555',
    backgroundColor: '#eee',
  }
}

export default Cantique;
