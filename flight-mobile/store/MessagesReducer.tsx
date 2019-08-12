import { GET_ORDER,  ChatActionTypes } from './Types'


export function MessagesReducer(state = [], action: ChatActionTypes) {
  switch (action.type) {
    case GET_ORDER: 
      return {...state, isLoading: true} 
    default:
      return state;
    }
};

