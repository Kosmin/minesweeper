import * as selectors from '../selectors';
import { initState, mockState } from '../../../app/tests/mocks';
import { mockMapArray, mockMapLayout } from './mocks';

describe('Home Selectors', () => {
  beforeEach(() => { initState() });

  it('mapLayoutSelector returns the mapLayout', () => {
    expect(selectors.mapLayoutSelector(
      mockState({game: {mapLayout: mockMapArray}})
    )).toEqual(mockMapArray);
  });

  it('gameStatusSelector returns the status', () => {
    expect(selectors.gameStatusSelector(
      mockState({game: {status: 'lost'}})
    )).toEqual('lost');
  });

  it('colNumberSelector returns the number of columns', () => {
    expect(selectors.colNumberSelector(mockState({ game: {
      mapLayout: mockMapLayout
    }}))).toEqual(10);
  });
  it('rowNumberSelector returns the number of rows', () => {
    expect(selectors.rowNumberSelector(mockState({ game: {
      mapLayout: mockMapLayout
    }}))).toEqual(10);
  });
  it('flagSelector returns value for given coordinates', () => {
    expect(selectors.flagSelector(
      mockState({ game: {
        flags: {"0,0": true}
      }})
    )("0", "0")).toEqual(true);
  })
});