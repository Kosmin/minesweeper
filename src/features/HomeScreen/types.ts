export interface IHomeState {
  name: string;
  record: number;
  error?: string;
  loading: boolean;
  level: number;
}

export type IActionName = string;

export interface IUserAction {
    type: IActionName;
    payload?: null | string | object | number;
}

export interface IUserStartGameAction extends IUserAction {
  type: IActionName;
  payload: {
    name: string;
    level: number;
  };
}

export type ISaga = Iterable<unknown>;