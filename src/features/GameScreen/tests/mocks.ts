
import * as SI from 'seamless-immutable';
import { IGameState } from '../types';
import { getLayoutFromString } from "../../../lib/mapLayout";
import { IMapLayout } from "../types";

export const mockMap = `map: 0001□□□□□□
0112□□□□□□
01□□□□□□□□
01□□□□□□□□
01□□□□□□□□
01□□□□□□□□
012□□□□□□□
00111113□□
00000001□□
00000001□□`;

export const mockMapArray: string[][] = mockMap.split('map:')[1].trim().split('\n').map((s) => s.split(''));
export const mockMapLayout: IMapLayout = getLayoutFromString(mockMap);

export let stateMock: IGameState;
export const initialStateObject: any = {
  mapLayout: {},
  status: 'started',
  wins: 0,
  losses: 0,
  flags: {},
};
export const initialState: IGameState = SI.from(initialStateObject);
export const initState = () => { stateMock = initialState }
export const mockState = (keys: any) => {
  return SI.from({
    ...initialStateObject,
    ...keys,
  });
}