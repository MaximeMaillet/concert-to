import { types } from './actions.js';

const initialState = {
  user: null,
  isConnected: false,
  loading: false,
};

export default function reducer(state = initialState, action) {
  if(action.type === types.CONNECT) {
    return {
      ...state,
      user: action.user,
      isConnected: true,
    };
  }
  else if(action.type === types.DISCONNECT) {
    return {
      ...state,
      isConnected: false,
      loading: false,
    };
  }
  else if(action.type === types.LOADING) {
    return {
      ...state,
      isConnected: false,
      loading: action.loading,
    };
  }
  else {
    return state;
  }
}