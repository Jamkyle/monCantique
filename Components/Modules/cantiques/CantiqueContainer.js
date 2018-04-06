import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import {NavigationActions} from 'react-navigation';
import Cantique from './Cantique';
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'

export default compose(
  firebaseConnect([
    '/'
  ]),
  connect(
  (state) => ({state}),
  (dispatch, { navigation }) => {
    return{
      getTrad : (id, firebase) => dispatch({ type:'GET_TRAD',  id: id, firebase : firebase}),
      go: (route, id) => navigation.dispatch(NavigationActions.navigate({routeName: route, params: id })),
      doList : () => dispatch({type : 'DO_FAV_LIST'})
    }
  }
)
)(Cantique);
