import GameReducer from '../reducer';
import * as actions from '../actions';
import * as SI from 'seamless-immutable';
import { mockMapLayout } from './mocks';
import { IMapAction } from '../types';
import { mockState } from './mocks';

describe('GameReducer', () => {
  it('returns the initial state', () => {
    expect(GameReducer(undefined, {} as IMapAction)).toEqual(SI.from({
      mapLayout: {},
      status: 'started',
      wins: 0,
      losses: 0,
      flags: {}
    }))
  });
  it('handles SET_MAP and sets new mapLayout', () => {
    expect(GameReducer(undefined, {
      type: actions.SET_MAP,
      payload: mockMapLayout
    }).mapLayout).toEqual(mockMapLayout);
  });
  it('handles SET_STATUS', () => {
    expect(GameReducer(undefined, {
      type: actions.SET_STATUS,
      payload: 'won'
    }).status).toEqual('won')
  });
  it('handles INCREMENT_WINS', () => {
    expect(GameReducer(undefined, {
      type: actions.INCREMENT_WINS
    }).wins).toEqual(1)
  });
  it('handles INCREMENT_LOSSES', () => {
    expect(GameReducer(undefined, {
      type: actions.INCREMENT_LOSSES
    }).losses).toEqual(1)
  });
});