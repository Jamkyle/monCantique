import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { NavigationActions } from 'react-navigation';
import Main from './Main';
import { firebaseConnect } from 'react-redux-firebase'

export default compose(
  firebaseConnect([
    '/'
  ]),
  connect(
  (state) => ({
    state
  }),
  (dispatch, { navigation }) => {
    return {
      go: (route, id) => navigation.navigate({routeName: route, params: id, action : dispatch(NavigationActions.navigate({routeName: route, params: id})) }),
      getList : (txt, firebase) => dispatch({ type:'GET_LIST_BY_TITLE',  id: txt, firebase : firebase}),
      clearNum : () => dispatch({type:'CLEAR_NUM'})
      }
  }
))(Main);
