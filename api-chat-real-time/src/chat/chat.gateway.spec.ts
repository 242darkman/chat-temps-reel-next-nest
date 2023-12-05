import { Test, TestingModule } from '@nestjs/testing';

import { ChatGateway } from './chat.gateway';

describe('ChatGateway', () => {
  let gateway: ChatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatGateway],
    }).compile();

    gateway = module.get<ChatGateway>(ChatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('afterInit', () => {
    it('should log "Initialized"', () => {
      const logSpy = jest.spyOn(gateway.logger, 'log');
      gateway.afterInit();
      expect(logSpy).toHaveBeenCalledWith('Initialized');
    });
  });

  describe('handleConnection', () => {
    it('should log the client id and the number of connected clients', () => {
      const logSpy = jest.spyOn(gateway.logger, 'log');
      const debugSpy = jest.spyOn(gateway.logger, 'debug');
      const clientMock = { id: '123' };
      gateway.handleConnection(clientMock);
      expect(logSpy).toHaveBeenCalledWith(
        `Client id: ${clientMock.id} connected`,
      );
      expect(debugSpy).toHaveBeenCalledWith(
        `Number of connected clients: ${gateway.io.sockets.sockets.size}`,
      );
    });
  });

  describe('handleDisconnect', () => {
    it('should log the client id', () => {
      const logSpy = jest.spyOn(gateway.logger, 'log');
      const clientMock = { id: '123' };
      gateway.handleDisconnect(clientMock);
      expect(logSpy).toHaveBeenCalledWith(
        `Client id:${clientMock.id} disconnected`,
      );
    });

    describe('handleMessage', () => {
      it('should log the client id and the payload, and return an object with event and data properties', () => {
        const logSpy = jest.spyOn(gateway.logger, 'log');
        const debugSpy = jest.spyOn(gateway.logger, 'debug');
        const clientMock = { id: '123' };
        const dataMock = 'test data';
        const result = gateway.handleMessage(clientMock, dataMock);
        expect(logSpy).toHaveBeenCalledWith(
          `Message received from client id: ${clientMock.id}`,
        );
        expect(debugSpy).toHaveBeenCalledWith(`Payload: ${dataMock}`);
        expect(result).toEqual({
          event: 'pong',
          data: 'Wrong data that will make the test fail',
        });
      });
    });
  });
});
