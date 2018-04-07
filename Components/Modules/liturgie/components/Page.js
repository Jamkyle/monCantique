import React, { Component } from 'react';
import {connect} from 'react-redux';
import { View, Text, Button, AsyncStorage} from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

class Page extends Component {
  render(){
    return (
      <View style={{ alignItems:'center' }} >
        <Text style={{ textAlign : 'center' }} >{ this.props.content }</Text>
      </View>
    )
  }
}

export default Page
