import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableNativeFeedback,TouchableWithoutFeedback, AsyncStorage, Button} from 'react-native';
import _ from 'lodash'
import { Font } from 'expo'
import { getVal } from 'react-redux-firebase'
import { Icon, Header , Overlay} from 'react-native-elements';

class Cantique extends Component {
  static navigationOptions = {
    title: 'Le Cantique'
  }
  state = {
    hira : '', size : 14, color : '#082b4b', favorite : 'favorite-border'
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
    const { navigation, storeIn } = nextProps
    if(nextProps.state !== this.props.state && aCantique.cantique !== {})
      {
        storeIn( navigation.state.params, '@recent:num')
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
          this.setState({size : this.state.size + 2})
      }
      else {
        if( this.state.size >= 10 )
          this.setState({size : this.state.size - 2})
      }
  }

  render() {
    const { hira, size, color } = this.state
    const { navigation, getTrad, go } = this.props
    let id
      id = navigation.state.params|0
    return (
      <View style={{height : '100%',  alignItems: 'center', }}>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          innerContainerStyles ={{ justifyContent: 'space-around' }}
          outerContainerStyles={{ width : '100%', height: 40, backgroundColor: '#fff', ...styles.containerStyle }}
          centerComponent={{ text : id.toString(), style: {color :'rgb(0, 47, 139)'} }}
        />

          <ScrollView style={{ width : '88%' }}>
            <Text style={{color: '#a7a7a7', fontSize:9, textAlign:'center'}} >double tap pour afficher trad</Text>
            <Icon name='touch-app' color='#aaa' size={12}/>
            <TouchableWithoutFeedback onPress={ this._press } >
              <View style={{  alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...this.font, fontSize : size, textAlign:'center', color : color  }} > { hira } </Text>
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
        <View style={{ width : '100%',  flexDirection:'row', justifyContent: 'center', right : 0, backgroundColor:'#fff', ...styles.containerStyle }}>
            <Button title='A+' style={ styles.button } onPress={ () => this._changeSize('in') } />
            <Button title='A-' style={ styles.button } onPress={ () => this._changeSize('out') } />
            <Icon name={this.state.favorite} style={ styles.button } onPress={ () => this._addFavori() } />
        </View>
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
    marginLeft: 5,
    marginRight: 5,
  }
}

export default Cantique;
