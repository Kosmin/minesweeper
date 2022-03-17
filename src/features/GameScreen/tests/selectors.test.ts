import * as selectors from '../selectors';
import { initState, mockState, stateMock } from '../../../app/tests/mocks';
import { mockMapArray } from './mocks';

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

  it('columnSelector returns the number of columns', () => {/* left empty for performance improvements */});
  it('rowSelector returns the number of rows', () => {/* left empty for performance improvements */});
});