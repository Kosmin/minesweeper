import * as actions from '../actions';
import { mockMap } from './mocks';

describe("GameScreen Actions", () => {
  it('restartGame', () => {
    expect(actions.restartGame()).toEqual({type: 'GAME/RESTART_GAME'})
  });
  it('incrementWins', () => {
    expect(actions.incrementWins()).toEqual({type: 'GAME/INCREMENT_WINS'})
  });
  it('incrementLosses', () => {
    expect(actions.incrementLosses()).toEqual({type: 'GAME/INCREMENT_LOSSES'})
  });
  it('setMap', () => {
    expect(actions.setMap(mockMap)).toEqual({
      type: 'GAME/SET_MAP',
      // Temporary until the performance changes come in
      payload: mockMap.split('map:')[1].trim().split('\n').map((s) => s.split(''))
    })
  });
  it('setStatus', () => {
    expect(actions.setStatus('lost')).toEqual({type: 'GAME/SET_STATUS', payload: 'lost'})
  });
  it('mineCheck', () => {
    const payload = {x: 0, y: 1};
    expect(actions.mineCheck(payload)).toEqual({type: 'GAME/MINE_CHECK', payload })
  });
});