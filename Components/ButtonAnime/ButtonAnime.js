import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import { Animated, Dimensions } from 'react-native'

class ButtonAnime extends Component{
  constructor(props){
    super(props)
    var {height, width} = Dimensions.get('window')
    this._animated = new Animated.Value(0, {useNativeDriver: true})
    this._opacity = new Animated.Value(0)
  }


  componentDidMount(){
    var {height, width} = Dimensions.get('window')
    Animated.timing(this._animated, {
      toValue: 1,
      duration: 200,
    }).start();
    Animated.timing(this._opacity, {
      toValue: 1,
      duration: 200,
    }).start();
  }

  componentDidUpdate(prevProps){
    var {height, width} = Dimensions.get('window')
    if(prevProps.arr !== this.props.arr){
      this._animated = new Animated.Value(0, {useNativeDriver: true})
      Animated.timing(this._animated, {
        toValue: 1,
        duration: 200,
      }).start()
    }

    //   let l = this.props.tab.length
    //     if(this.props !== nextProps && (l > 1 || nextProps.tab.length !== 1)){
    //       let x = this.state.x - ( width/2)
    //       this.setState({x: x})
    //     }
    //     if(this.state.x !== nextState.x){
    //       this._animated = new Animated.Value(0)
    //       Animated.timing(this._animated, {
    //         toValue: 1,
    //         duration: 200,
    //       }).start()
    //       this.setState({x:this.state.mx})
    //     }
  }

  _onPress = (i) => {
      if(i === 'FFPM')
        i = ''
      this.props.onPress(i)
  }

  render(){
    var {height, width} = Dimensions.get('window')
    const {title} = this.props
    const {arr, index} = this.props

    const move = this._animated.interpolate({
            inputRange: [0, 1],
            outputRange: [ Math.sin(width/2 - 70) * (width/arr.length)*index + width/2 - 70, 0 ]})

    // const opacity = this.opactity.interpolate({
    //    inputRange: [0, 1],
    //    outputRange: [0, 1]
    // })

    return (<Animated.View style={{...this.props.buttonStyle, transform : [{ translateX : move }], opacity:this._opacity, marginLeft:5, marginRight:5, alignItems:'center' }}>
              <Button title={title} buttonStyle={{...this.props.buttonStyle, ...this.props.color}} onPress={ () => this._onPress(title) } fontSize={14} />
            </Animated.View>)
  }

}

export default ButtonAnime
