import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { IsNotEmpty, IsString } from 'class-validator';
import { CustomExceptionFilter } from './http-ws-exception.filter';
import { get } from 'lodash';

class ChatMessage {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  message: string;
}

@WebSocketGateway({ cors: true })
@UseFilters(new CustomExceptionFilter())
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  public readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  /**
   * La fonction afterInit est appelée après l'initialisation de la classe.
   *
   * @param {void} - Cette fonction ne prend aucun paramètre.
   * @return {void} - Cette fonction ne renvoie aucune valeur.
   */
  afterInit() {
    this.logger.log('Initialized');
  }

  /**
   * Gère la connexion d'un client.
   *
   * @param {any} client - L'objet client.
   * @param {...any[]} args - Arguments supplémentaires.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: any, ...args: any[]) {
    const { sockets } = this.server.sockets;

    this.logger.log(`Client id: ${client.id} connected`);
    this.logger.debug(`Number of connected clients: ${sockets.size}`);
  }

  /**
   * Gère la déconnexion d'un client.
   *
   * @param {any} client - Le client qui s'est déconnecté.
   */
  handleDisconnect(client: any) {
    this.logger.log(`Client id: ${client} disconnected`);
  }

  formatFrenchDate({ date }) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} à ${hours}:${minutes}`;
  }

  @SubscribeMessage('send_message')
  handleMessage(
    @MessageBody() message: ChatMessage,
    @ConnectedSocket() _client: Socket,
  ) {
    const timestamp = this.formatFrenchDate({ date: new Date() });
    this.logger.debug(`Message: ${message}`);
    // Diffuser le message à tous les clients connectés
    this.server.emit('message', {
      username: get(message, 'username'),
      message: get(message, 'message'),
      timestamp,
    });
  }
}
