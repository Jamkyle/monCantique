import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableNativeFeedback,TouchableWithoutFeedback, AsyncStorage, Button} from 'react-native';
import _ from 'lodash'
import { Font } from 'expo'
import { getVal } from 'react-redux-firebase'
import { Icon, Header , Overlay} from 'react-native-elements';

class Strophes extends Component {

  state = { show: this.props.show}

  _press = () => {
      this.setState({ show : !this.state.show })
  }

  componentWillReceiveProps(nextProps){

  }

  render(){
    // let trad
    // this.state.show ? trad = <Text style={{ ...this.font, fontSize : this.props.size, textAlign:'center', color : '#2e6ea8', marginBottom:20  }} > { this.props.trad } </Text> : trad = null
    return (
      <TouchableWithoutFeedback onPress={ this._press }>
        <View style={{  alignItems: 'center', justifyContent: 'center', flex:1}}>
          <Text style={{ ...this.font, fontSize : this.props.size, textAlign:'center', color : '#082b4b', marginBottom: 10  }} > { this.props.content } </Text>
          { this.state.show && <Text style={{ ...this.font, fontSize : this.props.size, textAlign:'center', color : '#2e6ea8', marginBottom:20  }} > { this.props.trad } </Text> }
        </View>
      </TouchableWithoutFeedback>
    )
  }

}

export default Strophes
