import { IActionName } from "../../app/types";
import { ICoordinates, IGameAction, IGameStatus } from "./types";

export const RESTART_GAME: IActionName = 'HOME/RESTART_GAME';
export const SET_MAP: IActionName = 'GAME/SET_MAP';
export const SET_STATUS: IActionName = 'GAME/SET_STATUS';
export const MINE_CHECK: IActionName = 'GAME/MINE_CHECK';
export const INCREMENT_WINS: IActionName = 'HOME/INCREMENT_WINS';
export const INCREMENT_LOSSES: IActionName = 'HOME/INCREMENT_LOSSES';

export const restartGame = (): IGameAction => ({
  type: RESTART_GAME,
});

export const incrementWins = (): IGameAction => ({ type: INCREMENT_WINS });
export const incrementLosses = (): IGameAction => ({ type: INCREMENT_LOSSES });

export const setMap = (payload: string): IGameAction => ({
  type: SET_MAP,
  payload: payload.trim().split('\n').map((s) => s.split('')),
});

export const setStatus = (payload: IGameStatus): IGameAction => ({
  type: SET_STATUS,
  payload: payload,
});

export const mineCheck = (payload: ICoordinates): IGameAction => {
  return {
    type: MINE_CHECK,
    payload: payload,
  }
};
