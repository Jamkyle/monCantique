import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ScrollView, Text, Button, AsyncStorage} from 'react-native';
import { Icon, List, ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

class Page extends Component {
  render(){
    return (
      <ScrollView style={{height : '100%' }}>
        <Text style={{ textAlign : 'center' }} >{ this.props.content }</Text>
      </ScrollView>
    )
  }
}

export default Page
