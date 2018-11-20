import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import layoutReducer from './layoutReducer';


export default combineReducers({
  game: gameReducer,
  layout: layoutReducer
});
