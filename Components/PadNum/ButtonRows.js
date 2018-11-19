import React from 'react'
import {Icon, Button} from 'react-native-elements'
import { connect } from 'react-redux';

const ButtonRows = ( props ) => {
  let buttons = []

  // for (var i = props.start; i < props.start + props.inc; i++){
  //   buttons = [...buttons, <Button title={i.toString()} key={i+'num'} buttonStyle={ props.buttonStyle } onPress={ () => this.press(i) }/>]
  // }
  _onPress = (i) => {
    if( !isNaN(i) )
      props.stackNum(i)
    else {
      if(i === 'FFPM')
        i = ''

      props.onPress(i)
    }
  }


  buttons = props.value.map((i) => {
    return <Button title={i.toString()} key={i+'num'} buttonStyle={ isNaN(i) ? {...props.colors[i.toString()], ...props.buttonStyle} : props.buttonStyle } fontSize={props.size} onPress={ () => _onPress(i) }/>
  })

  return (
    buttons
  )
}

export default connect(
  state => state,
  (dispatch) => {
    return {
      stackNum : (num) => { dispatch({ type:'STACK_NUM', num: num }) }
    }
  }
)(ButtonRows)
