import * as SI from 'seamless-immutable';
import { IRootState } from "../store";

export let stateMock: IRootState;
export const initialStateObject: any = {
  home: {
    name: 'test name',
    error: 'some test error',
    loading: false,
    level: 4,
  },
  game: {
    mapLayout: {},
    status: 'started',
    wins: 0,
    losses: 0
  }
};
export const initialState: IRootState = SI.from(initialStateObject);
export const initState = () => { stateMock = initialState }
export const mockState = (keys: any) => {
  return SI.from({
    ...initialStateObject,
    ...keys,
  });
}
