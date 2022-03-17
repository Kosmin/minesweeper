import { IActionName } from "../../app/types";

export type IMapLayout = string[][];
export type IGameStatus = 'started' | 'won' | 'lost';
export interface IGameState {
  mapLayout: IMapLayout;
  status: IGameStatus;
  wins: number;
  losses: number;
}
export interface ICoordinates {
  row: number;
  col: number;
}

export interface IRecord {
  wins: number;
  losses: number
}
export interface IGameAction {
  type: IActionName;
  payload?: null | string | IMapLayout | ICoordinates;
}

export interface IMineCheckAction extends IGameAction {
  payload: ICoordinates;
}

export interface ICellBoxProps {
  row: number;
  col: number;
  key?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
