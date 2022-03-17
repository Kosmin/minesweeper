import * as SI from 'seamless-immutable';
import { IMapLayout } from '../features/GameScreen/types';
import { getLayoutFromString } from './mapLayout';

const initialStateObject: any = {
  game: {
    mapLayout: {},
    status: 'started',
    wins: 0,
    losses: 0
  }
};

const initialState: any = SI.from(initialStateObject);
const mockMap = `map: 1□
1□`
const mockMapLayout: IMapLayout = {
  "0": { "0": "1", "1": "□" },
  "1": { "0": "1", "1": "□" },
};

describe("Layout Changes Helpers", () => {
  describe("getLayoutFromString", () => {
    it("returns a layout object when given a map string", () => {
      expect(getLayoutFromString(mockMap)).toEqual(mockMapLayout)
    })
  })
})