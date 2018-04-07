import { combineReducers } from 'redux';
import Routes from '../Components/Routes';
import { NavigationActions} from 'react-navigation';
import { cantiqueStateReducer, traductionState, listCantique, recentCantique, favCantique } from '../Components/Modules/cantiques/CantiqueState'
import { liturgieStateReducer } from '../Components/Modules/liturgie/liturgieState'
import { firebaseReducer } from 'react-redux-firebase'

/*const initState = BaseNavigation.router.getStateForAction(
  NavigationActions.init()
);*/

const navReducer = (state, action) => {
  // console.log(state);
    const newState = Routes.router.getStateForAction(action, state);
    return newState || state;
};

export default combineReducers({
  navigation: navReducer,
  traduction : traductionState,
  firebase : firebaseReducer,
  listCantique : listCantique,
  state : ( state = { } ) => state,
  aCantique: cantiqueStateReducer,
  listRec : recentCantique,
  listFav : favCantique,
  pages : liturgieStateReducer
});
