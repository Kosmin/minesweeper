import { IRootState } from "../../app/store";
import { IMapLayout, IRecord } from "./types";
import * as SI from 'seamless-immutable';

export const mapLayoutSelector = (state: IRootState): SI.Immutable<IMapLayout> => state.game.mapLayout;
export const gameStatusSelector = (state: IRootState) => state.game.status;
export const rowNumberSelector = (state: IRootState): number => (
  Object.keys(state.game.mapLayout).length > 0 ? Object.keys(state.game.mapLayout).length : 0
)
export const colNumberSelector = (state: IRootState): number => (
  Object.keys(state.game.mapLayout).length > 0 ? Object.keys(state.game.mapLayout[0]).length : 0
)
export const recordSelector = (state: IRootState): IRecord => (
  {
    wins: state.game.wins,
    losses: state.game.losses,
  }
)
export const flagSelector = (state: IRootState): any => (row: string, col: string) => (
  state.game.flags[`${row},${col}`]
)