import { IRootState } from "../../app/store";
import { IMapLayout, IRecord } from "./types";
import * as SI from 'seamless-immutable';

export const mapLayoutSelector = (state: IRootState): SI.Immutable<IMapLayout> => state.game.mapLayout;
export const gameStatusSelector = (state: IRootState) => state.game.status;
export const rowSelector = (state: IRootState): number => (
  state.game.mapLayout.length > 0 ? state.game.mapLayout.length : 0
)
export const columnSelector = (state: IRootState): number => (
  state.game.mapLayout.length > 0 ? state.game.mapLayout[0].length : 0
)
export const recordSelector = (state: IRootState): IRecord => (
  {
    wins: state.game.wins,
    losses: state.game.losses,
  }
)
