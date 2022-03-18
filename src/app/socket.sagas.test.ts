import {
  initSocketChannel,
  onmessageCallback,
  onopenCallback,
  oncloseCallback,
  onerrorCallback,
  SOCKET_EVENTS,
  createOnOpenCallback,
  createOnCloseCallback,
  createOnMessageCallback,
  createOnErrorCallback,
  onSocketEvent,
  WEBSOCKET_OPEN,
  WEBSOCKET_CLOSE,
  WEBSOCKET_ERROR,
  WEBSOCKET_MESSAGE,
} from './socket.sagas';
import * as socketFunctions from '../lib/socket';
import { ISocketEventAction } from './types';

jest.mock("../lib/socket");

describe("Game sagas", () => {
  describe("initSocketChannel", () => {
    it("initializes the socket, attaches callbacks and listens to socket events", () => {
      const initSocketSaga = initSocketChannel();
      const createEventChannel = initSocketSaga.next().value.payload.fn;
      expect(socketFunctions.InitGameSocket).toHaveBeenCalled();
      const eventChannel = createEventChannel();

      // Black box testing: here just check that the proper callbacks are attached
      // and in the lib/socket tests we check if any attached callbacks are fired
      const expectedEventsAttached = {
        onmessage: onmessageCallback,
        onopen: onopenCallback,
        onclose: oncloseCallback,
        onerror: onerrorCallback
      }
      expect(onmessageCallback).not.toBe(undefined);
      expect(onopenCallback).not.toBe(undefined);
      expect(oncloseCallback).not.toBe(undefined);
      expect(onerrorCallback).not.toBe(undefined);
      expect(socketFunctions.attachSocketEvents).toHaveBeenCalledWith(expectedEventsAttached);

      // TODO: also test that initSocketChannel forwards channel messages to
    });

    it("emits the expected actions on socket events", () => {
      // Stub emitter and test it sends the right events
      // no need to test actual emitter since it's part of redux-saga
      const emitter = jest.fn(() => {});
      let msgEvent: MessageEvent = new MessageEvent('test event');
      let errorEvent: Event = new Event('test error');
      createOnMessageCallback(emitter)(msgEvent);
      expect(emitter).toHaveBeenCalledWith({
        type: SOCKET_EVENTS.MESSAGE,
        payload: msgEvent
      });
      createOnOpenCallback(emitter)();
      expect(emitter).toHaveBeenCalledWith({ type: SOCKET_EVENTS.OPEN });
      createOnCloseCallback(emitter)();
      expect(emitter).toHaveBeenCalledWith({ type: SOCKET_EVENTS.CLOSE });
      createOnErrorCallback(emitter)(errorEvent);
      expect(emitter).toHaveBeenCalledWith({
        type: SOCKET_EVENTS.ERROR,
        payload: errorEvent
      });
    })
  });

  describe("onSocketEvent", () => {
    it("handles socket open", async () => {
      let result: any = onSocketEvent(
        {type: SOCKET_EVENTS.OPEN} as ISocketEventAction
      ).next().value.payload.action;
      expect(result).toEqual({ type: WEBSOCKET_OPEN })
    })

    it("handles socket close", async () => {
      let result: any = onSocketEvent(
        {type: SOCKET_EVENTS.CLOSE} as ISocketEventAction
      ).next().value.payload.action;
      expect(result).toEqual({ type: WEBSOCKET_CLOSE })
    })

    it("handles socket error", async () => {
      let result: any = onSocketEvent(
        {type: SOCKET_EVENTS.ERROR} as ISocketEventAction
      ).next().value.payload.action;
      expect(result).toEqual({ type: WEBSOCKET_ERROR })
    })

    it("handles socket message", async () => {
      let result: any = onSocketEvent(
        {type: SOCKET_EVENTS.MESSAGE, payload: 'test message'} as any
      ).next().value.payload.action;
      expect(result).toEqual({ type: WEBSOCKET_MESSAGE, payload: 'test message' })
    })
  })
});