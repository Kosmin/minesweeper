export type IActionName = string;

export interface IGenericAction {
    type: IActionName;
    payload?: null | string;
}

export type ISaga = Iterable<unknown>;

export type ISocketEventType = 'open' | 'close' | 'error' | 'message';
export interface ISocketEventAction {
  type: ISocketEventType;
  payload: MessageEvent;
}