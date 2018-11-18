import { SET_GAME_OPTIONS } from '../actions/types';


const initialState = {
  width: 0,
  height: 0,
  mines: 0
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_GAME_OPTIONS:
      return { ...state, ...payload };

    default:
      return state;
  }
};
