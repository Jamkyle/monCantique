import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { NavigationActions } from 'react-navigation';
import Cantique from './Cantique';
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'

export default compose(
  firebaseConnect([
    '/'
  ]),
  connect(
  (state) => ({state}),
  (dispatch, { navigation }) => {
    return {
      getTrad : (id, firebase) => dispatch({ type:'GET_TRAD',  id: id, firebase : firebase}),
      go: (route, id) => navigation.dispatch(NavigationActions.navigate({routeName: route, params: id })),
      storeIn : (val, key) => dispatch({type : 'ADD_TO_AS', val :val, key: key})
    }
  }
))
(Cantique);
