import { SET_THEME, SET_3D } from '../actions/types';


const initialState = {
  theme: 'dark',
  mode3D: true
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case SET_THEME:
    return {
      ...state,
      theme: payload
    }

  case SET_3D:
    return {
      ...state,
      mode3D: payload
    }

  default:
    return state
  }
}
