import React, {Component} from 'react'
import {Icon, Button} from 'react-native-elements'
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    Animated
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationRoute } from 'react-navigation';

class TabBarCustom extends Component<TabBarProps, TabBarState, NavigationTransitionProps> {
  navigationStateIndex = null;

  constructor(props) {
    super(props)
    this.puce = null
    const initialIndex = props.navigation.state.index;
    this.state = {
      selectedIndexAnimated: new Animated.Value(initialIndex),
      move: new Animated.Value((initialIndex-1)*10),
      sizeY: new Animated.Value(0),
    };
  }

  componentWillUpdate(nextProps) {
    if (
      this.props.navigation.state.index !== nextProps.navigation.state.index
    ) {
      this.state.sizeY= new Animated.Value(0)
      Animated.parallel([
      Animated.timing(this.state.selectedIndexAnimated, {
        toValue: nextProps.navigation.state.index,
      }),
      Animated.spring(this.state.move, {
        toValue: (nextProps.navigation.state.index-1)*10+(nextProps.navigation.state.index)*10,
      }),
      Animated.spring(this.state.sizeY, {
        toValue: 6,
      })
    ]).start()
    }
  }

  renderTabButton(route: NavigationRoute, idx: any){
    const {
            activeTintColor,
            inactiveTintColor,
            navigation,
            getLabelText,
            renderIcon,
            getScreenProps
        } = this.props;

    const currentIndex = navigation.state.index;
    const color = currentIndex === idx ? activeTintColor : inactiveTintColor;
    const label = getLabelText({ route, focused: currentIndex === idx, index: idx })

    return (
      <TouchableOpacity
          onPress={ () => {
            if (currentIndex != idx) {
              navigation.navigate(route.routeName);
            }
          }}
          style={{ alignItems:'center', margin : 5 }}
          key={ route.routeName }>
        <View ref={(e) => this.puce = e } style={{ borderRadius:10, backgroundColor:color, width:10, height:10 }}></View>
      </TouchableOpacity>
    )
  }

  render(){

    const {navigation, style, getLabelText} = this.props
    const {selectedIndexAnimated, sizeY} = this.state
    const currentIndex = navigation.state.index
    const tabBarButtons = navigation.state.routes.map(this.renderTabButton.bind(this));

    let sizeX = selectedIndexAnimated.interpolate({
      inputRange: [currentIndex - 1, currentIndex, currentIndex + 1],
      outputRange: [22, 0, 22],
    });
    let opacity = selectedIndexAnimated.interpolate({
      inputRange: [currentIndex - 1, currentIndex, currentIndex +1],
      outputRange: [1, 0, 1],
    });
    return (<View style={[{ flexDirection:'column', justifyContent:'center', alignItems:'center', marginTop:10 }, style]}>
              <Text style={{ fontSize:14, marginBottom : 5}}>{currentIndex === 0 ? 'par num' : 'par titre' }</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                { tabBarButtons }
                <Animated.View style={{ width:sizeX, opacity,position: 'absolute', transform: [{ translateX: this.state.move }], borderWidth:sizeY, borderRadius: 10 }}></Animated.View>
              </View>
            </View>
          )

  }
}

export default TabBarCustom
