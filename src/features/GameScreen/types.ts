import { IActionName } from "../../app/types";

export type IMapLayoutRow = {[key: string]: string};
export type IMapLayoutColumn = {[key: string]: string};
export type IMapLayout = {[key: string]: IMapLayoutColumn};

export type IGameStatus = 'started' | 'won' | 'lost';
export interface IGameState {
  mapLayout: IMapLayout;
  status: IGameStatus;
  wins: number;
  losses: number;
  flags: IFlagCoordinates;
}
export interface ICoordinates {
  row: string;
  col: string;
}

export interface IRecord {
  wins: number;
  losses: number
}
export interface IGameAction {
  type: IActionName;
  payload?: null | string | IMapLayout | ICoordinates;
}

export interface IMapAction extends IGameAction {
  payload: IMapLayout
}

export interface IMineCheckAction extends IGameAction {
  payload: ICoordinates;
}

export interface ICellBoxProps {
  row: string;
  col: string;
  content: string;
  key?: string;
}

// "1,1" = true
export type IFlagCoordinates = {[key: string]: boolean};
