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

import { Logger, UseFilters } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { IsNotEmpty, IsString } from 'class-validator';
import { CustomExceptionFilter } from './http-ws-exception.filter';
import { get, isEqual } from 'lodash';
import { ChatService } from './chat.service';

class ChatMessage {
  @IsNotEmpty()
  messageId: number | string;

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

  constructor(private chatService: ChatService) {}

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

  /**
   * Diffusion le message à tous les clients connectés
   */
  private spreadMessage(
    messageId: number | string,
    username: string,
    message: string,
    timestamp: string,
  ) {
    this.server.emit('message', {
      messageId,
      username,
      message,
      timestamp,
    });
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() msg: ChatMessage,
    //@ConnectedSocket() _client: Socket,
  ) {
    const messageId = get(msg, 'messageId');
    const username = get(msg, 'username');
    const message = get(msg, 'message');
    const timestamp = this.formatFrenchDate({ date: new Date() });
    const translationLanguage = get(msg, 'translationLanguage');

    // 2. Envoyer le message à l'API d'OpenAI pour la traduction
    if (!isEqual(translationLanguage, 'French')) {
      const transledMessage = await this.chatService.translate(
        message,
        translationLanguage,
      );
      this.spreadMessage(messageId, username, transledMessage, timestamp);
      return;
    }
    this.spreadMessage(messageId, username, message, timestamp);
  }

  @SubscribeMessage('send_audio')
  async handleAudio(
    @MessageBody() audio: Buffer,
    @ConnectedSocket() _client: Socket,
  ) {
    // Récupérer le nom d'utilisateur du client
    const username = _client.handshake.query.username;

    // Récupérer le timestamp
    const timestamp = this.formatFrenchDate({ date: new Date() });

    // Convertir le message audio en texte
    const response = await this.chatService.transcribeAudioToTextMessage(audio);

    const transcribedText = response.choices[0].message.content;

    // Diffuser le texte transcrit à tous les clients connectés
    //this.spreadMessage(username, transcribedText, timestamp);
  }
}
