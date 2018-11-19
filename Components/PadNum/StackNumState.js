
export const stackNumStateReducer = (state = [], action) => {
  switch (action.type) {
    case 'STACK_NUM':
      if( state[0] === 0)
        state = []
      if(state.length < 3)
        return [...state, action.num]
      else
        return state
    case 'REMOVE_NUM':
      state.pop()
      return state
    case 'CLEAR_NUM':
      return []
    case 'OVERIGHT_NUM':
      return [action.num]
    default:
      return state
  }
}
