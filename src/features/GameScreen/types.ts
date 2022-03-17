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
  x: number;
  y: number;
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
  x: number;
  y: number;
  key?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
