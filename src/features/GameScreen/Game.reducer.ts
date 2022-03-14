import { IGameState } from './types';
import * as SI from 'seamless-immutable';
import { IGenericAction } from '../../app/types';
import { INCREMENT_LOSSES, INCREMENT_WINS, SET_MAP, SET_STATUS } from './actions';

const INITIAL_STATE: SI.Immutable<IGameState> = SI.from({
  mapLayout: [],
  status: 'started',
  wins: 0,
  losses: 0,
});

const GameReducer = (
  state: SI.Immutable<IGameState> = INITIAL_STATE,
  action: IGenericAction
) => {
  switch (action.type) {
    case SET_MAP:
      return state.set("mapLayout", action.payload)
    case SET_STATUS:
      return state.set("status", action.payload)
    case INCREMENT_WINS:
      return state.set("wins", state.wins + 1)
    case INCREMENT_LOSSES:
      return state.set("losses", state.losses + 1)
    default:
        return state;
  }
};

export default GameReducer;