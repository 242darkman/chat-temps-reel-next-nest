import { AppController } from './app.controller';
import { ChatGateway } from './chat/chat.gateway';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ChatService } from './chat/chat.service';
import OpenAI from 'openai';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    ChatGateway,
    {
      provide: OpenAI,
      useValue: new OpenAI({ apiKey: process.env.OPENAI_API_KEY }),
    },
    ChatService,
  ],
})
export class AppModule {}
