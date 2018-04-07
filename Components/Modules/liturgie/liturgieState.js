export const liturgieStateReducer = (state = {}, action ) => {
  switch (action.type) {
   case 'GET_LITURGIE_RECEIVE':
   console.log(action);
    if ( action.data !== undefined ) {
       return action.data
    }
    else {
       return {}
    }
   default:
     return state;
   }
}
