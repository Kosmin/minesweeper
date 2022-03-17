import { SET_USER_NAME, CLEAR_ERROR, STOP_LOADING, START_LOADING, SHOW_ERROR, SET_LEVEL } from './actions';
import { IHomeState, IUserAction } from './types';
import * as SI from 'seamless-immutable';

export const INITIAL_STATE: SI.Immutable<IHomeState> = SI.from({
  name: '',
  error: '',
  loading: false,
  level: 1,
});

const HomeReducer = (
  state: SI.Immutable<IHomeState> = INITIAL_STATE,
  action: IUserAction | {}
) => {
  switch ((action as IUserAction).type) {
    case SET_USER_NAME:
      return state.set("name", (action as IUserAction).payload)
    case SET_LEVEL:
      return state.set("level", (action as IUserAction).payload)
    case SHOW_ERROR:
      return state.set("error", (action as IUserAction).payload)
    case CLEAR_ERROR:
      return state.set("error", '')
    case START_LOADING:
      return state.set("loading", true)
    case STOP_LOADING:
      return state.set("loading", false)
    default:
        return state;
  }
};

export default HomeReducer;