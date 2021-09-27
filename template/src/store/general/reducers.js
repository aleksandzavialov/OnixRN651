import { TOGGLE_LOADER, CLEAR_STORE } from './types';

const initialState = {
  isLoader: false,
  backgroundColor: '#fff'
};

export default function general(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LOADER:
      return {
        ...state,
        isLoader: !state.isLoader,
      };
    case CLEAR_STORE:
      return { ...initialState };
    default:
      return state;
  }
}
