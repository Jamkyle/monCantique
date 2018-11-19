import React from 'react'
import { connect } from 'react-redux'
import { Icon, Button } from 'react-native-elements'
import ButtonRows from './ButtonRows'
import { View } from 'react-native'
const PadNum = (props) => {

  return (
    <View style={{
        flex: 1,
        marginTop: 20
      }}>
      <View style={{flex:1, flexDirection:'row'}}>
        <ButtonRows value={[1,2,3]} buttonStyle={Styles.Button} size={16}/>
      </View>
      <View style={{flex:1, flexDirection:'row'}}>
        <ButtonRows value={[4,5,6]} buttonStyle={Styles.Button} size={16}/>
      </View>
      <View style={{flex:1, flexDirection:'row'}}>
        <ButtonRows value={[7,8,9]} buttonStyle={Styles.Button} size={16}/>
      </View>
      <View style={{flex:1, justifyContent: 'flex-end', flexDirection:'row'}}>
        <ButtonRows value={[0]} buttonStyle={Styles.Button} size={16}/>
        <Icon name='backspace' color='#99b' size={45} containerStyle={{...Styles.Button, margin: 15}} underlayColor='rgba(0,0,0,0)' onPress={ () => props.removeNum() } />
      </View>
    </View>
  )
}

const Styles = {
  Button : {
    borderRadius : 100,
    height:60,
    width:60,
    marginTop: 5
  }
}
export default connect(
  state => state,
  (dispatch) => {
    return {
      removeNum : () => dispatch({ type:'REMOVE_NUM' })
    }
  }
)(PadNum)
