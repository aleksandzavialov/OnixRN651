import { SET_USER_DATA, SET_USER_TOKENS } from './types';

const initialState = {
  accessToken: undefined,
  refreshToken: undefined,
  user: {
    firstName: '',
    lastName: '',
  },
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case SET_USER_TOKENS:
      return {
        ...state,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
      };
    case SET_USER_DATA:
      return {
        ...state,
        user: { ...state.user, ...action.user },
      };
    default:
      return state;
  }
}
