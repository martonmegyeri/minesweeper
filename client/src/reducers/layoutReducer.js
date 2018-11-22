import { SHOW_MESSAGE, HIDE_MESSAGE, SET_THEME, SET_3D } from '../actions/types';


const initialState = {
  message: {
    visible: false,
    text: ''
  },
  theme: 'dark',
  mode3D: true
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case SHOW_MESSAGE:
    return {
      ...state,
      message: payload
    }

  case HIDE_MESSAGE:
    return {
      ...state,
      message: {
        ...state.message,
        visible: payload.visible
      }
    }

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
