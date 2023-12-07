import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { get } from 'lodash';

@Injectable()
export class ChatService {
  constructor(private readonly openai: OpenAI) {}

  async translate(message: string, language: string): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Translate the following message to ${language}: "${message}"`,
          },
        ],
      });

      const translation = get(response, 'choices[0].message.content');

      return translation;
    } catch (error) {
      throw new Error(error);
    }
  }

}
