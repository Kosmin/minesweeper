import { IActionName } from "../../app/types";
import { ICoordinates, IGameAction, IGameStatus } from "./types";

export const RESTART_GAME: IActionName = 'GAME/RESTART_GAME';
export const SET_MAP: IActionName = 'GAME/SET_MAP';
export const SET_STATUS: IActionName = 'GAME/SET_STATUS';
export const MINE_CHECK: IActionName = 'GAME/MINE_CHECK';
export const INCREMENT_WINS: IActionName = 'GAME/INCREMENT_WINS';
export const INCREMENT_LOSSES: IActionName = 'GAME/INCREMENT_LOSSES';

export const restartGame = (): IGameAction => ({
  type: RESTART_GAME,
});

export const incrementWins = (): IGameAction => ({ type: INCREMENT_WINS });
export const incrementLosses = (): IGameAction => ({ type: INCREMENT_LOSSES });

export const setMap = (payload: string): IGameAction => ({
  type: SET_MAP,
  payload: payload.split('map:')[1].trim().split('\n').map((s) => s.split('')),
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
