import { IActionName, IUserAction } from './types';

export const START_GAME: IActionName = 'HOME/START_GAME';
export const SET_USER_NAME: IActionName = 'HOME/SET_USER_NAME';
export const SET_LEVEL: IActionName = 'HOME/SET_LEVEL';
export const SHOW_ERROR: IActionName = 'HOME/SHOW_ERROR';
export const CLEAR_ERROR:  IActionName = 'HOME/CLEAR_ERROR';
export const START_LOADING:  IActionName = 'HOME/START_LOADING';
export const STOP_LOADING:  IActionName = 'HOME/STOP_LOADING';
export const MAP_LOADED: IActionName = 'HOME/MAP_LOADED';

export const startGame = ({name, level}: {name:string, level:number}): IUserAction => ({
  type: START_GAME,
  payload: {
    name,
    level
  }
});

export const setUserName = (name: string): IUserAction => ({
  type: SET_USER_NAME,
  payload: name
});

export const setLevel = (level: number): IUserAction => ({
  type: SET_LEVEL,
  payload: level
});

export const showError = (error: string): IUserAction => ({
  type: SHOW_ERROR,
  payload: error
});

export const clearError = (): IUserAction => ({
  type: CLEAR_ERROR,
});

export const startLoading = (): IUserAction => ({
  type: START_LOADING,
});

export const stopLoading = (): IUserAction => ({
  type: STOP_LOADING,
});

export const mapLoaded = (): IUserAction => ({
  type: MAP_LOADED,
});

