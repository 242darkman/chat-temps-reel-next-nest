import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { WsException } from '@nestjs/websockets';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient();

    if (exception instanceof WsException) {
      const message = exception.getError();
      return client.emit('exception', {
        status: 'error',
        message,
      });
    }

    if (exception instanceof HttpException) {
      const message = exception.getResponse();
      return client.emit('exception', {
        status: 'error',
        message,
      });
    }

    const message = 'An error occurred';
    client.emit('exception', {
      status: 'error',
      message,
    });
  }
}
