import { AppController } from './app.controller';
import { ChatGateway } from './chat/chat.gateway';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ChatGateway],
})
export class AppModule {}
