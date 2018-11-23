const initState = { strophe : [ { trad:'Désolé, traduction non disponible!'} ] }

export const cantiqueStateReducer = (state = {cantique : '', arr : []}, action ) => {
  // console.log(action);
  switch (action.type) {
   case 'GET_CANTIQUE_RECEIVE':
    if ( action.data.items[0] !== undefined ) {
       return {
        cantique : action.data.items[0].description,
       }
    }
    else {
       return {
         cantique : ''
       }
    }
   default:
     return state;
   }
}

export const traductionState = (state = initState, action) => {
  switch (action.type) {
    case 'GET_TRAD':
      return action.trad
    default:
      return state

  }
}

export const listCantique = (state = [], action) => {
  switch (action.type) {
    case 'DO_LIST_CANTIQUES':
      return action.list
    default:
      return state

  }
}

export const recentCantique = (state = [], action) => {
  switch (action.type) {
    case 'RECENT_LIST_CANTIQUE':
      return action.list
    default:
      return state
  }
}

export const favCantique = (state = [], action) => {
  switch (action.type) {
    case 'FAV_LIST_CANTIQUE':
      return action.list
    default:
      return state
  }
}

export const switchShow = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_SHOW_STATE':
      return !action.show
    default:
      return state
  }
}
