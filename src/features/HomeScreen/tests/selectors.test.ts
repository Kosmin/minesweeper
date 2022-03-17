import * as selectors from '../selectors';
import { initState, mockState, stateMock } from '../../../app/tests/mocks';

describe('Home Selectors', () => {
  beforeEach(() => { initState() });

  it('userNameSelector returns the user name', () => {
    expect(selectors.userNameSelector(stateMock)).toEqual('test name');
  });

  it('levelSelector returns the level', () => {
    expect(selectors.levelSelector(stateMock)).toEqual(4);
  });

  describe('levelNameSelector', () => {
    it('returns easy for level 1', () => {
      expect(
        selectors.levelNameSelector(mockState({home: {level: 1}}))
      ).toEqual('easy');
    })

    it('returns medium for level 2', () => {
      expect(
        selectors.levelNameSelector(mockState({home: {level: 2}}))
      ).toEqual('medium');
    })

    it('returns hard for level 3', () => {
      expect(
        selectors.levelNameSelector(mockState({home: {level: 3}}))
      ).toEqual('hard');
    })

    it('returns hard for level 4', () => {
      expect(
        selectors.levelNameSelector(mockState({home: {level: 4}}))
      ).toEqual('very hard');
    })
  });

  it('errorSelector returns the error', () => {
    expect(selectors.errorSelector(mockState({home: {error: 'test error name'}}))).toEqual('test error name');
  });

  it('loadingSelector returns the loadingState', () => {
    expect(selectors.loadingSelector(mockState({home: {loading: true}}))).toEqual(true);
    expect(selectors.loadingSelector(mockState({home: {loading: false}}))).toEqual(false);
  });
});