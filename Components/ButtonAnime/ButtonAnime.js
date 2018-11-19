import React, { Component } from 'react'
import { Button } from 'react-native-elements'
import { Animated, Dimensions } from 'react-native'

class ButtonAnime extends Component{
  constructor(props){
    super(props)
    var {height, width} = Dimensions.get('window')
    this._animated = new Animated.Value(0)
    this._opacity = new Animated.Value(0)
    this._unmount = new Animated.Value(0)
    this.state = { x: 0, y: 0}
  }

  layoutView = (e) => {
    this.setState({ x:e.nativeEvent.layout.x, y: e.nativeEvent.layout.y  })
  }

  componentDidMount(){
    var {height, width} = Dimensions.get('window')
    Animated.timing(this._animated, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  componentWillUpdate(nextProps, nextState){
    var {height, width} = Dimensions.get('window')

        this._animated = new Animated.Value(0)
        Animated.timing(this._animated, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start()

  }

  _onPress = (i) => {
      if(i === 'FFPM')
        i = ''

      this.props.onPress(i)
  }

  move(){
    var {height, width} = Dimensions.get('window')
     return (this._animated.interpolate({
             inputRange: [0, 1],
             outputRange: [ Math.sin(width/2 - 70) * this.state.x + width/2 - 70, 0 ],
      })
    )
  }

  render(){
    var {height, width} = Dimensions.get('window')
    const {title} = this.props
    const opacity = this._animated.interpolate({
       inputRange: [0, 1],
       outputRange: [0, 1]
    })

    return (<Animated.View onLayout={ this.layoutView } style={{...this.props.buttonStyle, transform : [{ translateX : this.move() }], opacity:opacity, marginLeft:5, marginRight:5, alignItems:'center' }}>
              <Button title={title} buttonStyle={{...this.props.buttonStyle, ...this.props.color}} onPress={ () => this._onPress(title) } fontSize={14} />
            </Animated.View>)
  }

}

export default ButtonAnime
