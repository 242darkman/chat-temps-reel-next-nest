import { get, includes, some } from 'lodash';

import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

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
            content: `Translate the following message to ${language}: "${message}". Give just the message translation without double quotes and no explanation`,
          },
        ],
      });

      const translation = get(response, 'choices[0].message.content');

      return translation;
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkInformation(message: string): Promise<any> {
    try {
      const username = 'Cerebrix';

      // Étape 1 : Détection de la langue
      const languageResponse = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `What is the language of this message? "${message}". Just give the name of the language without single or double quotes and without explanation`,
          },
        ],
      });

      const language = get(languageResponse, 'choices[0].message.content');

      // Étape 2 : Validation de l'information dans la langue détectée
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Is the following statement an information and is it true: "${message}". If it's not information, don't give an explanation, just let us know that the message is not information.`,
          },
          {
            role: 'assistant',
            content: `If it's false, what is the correct information? If it's true, can you confirm it ? The answer must contain a maximum of 120 characters.`,
          },
        ],
      });

      const validationResult = get(response, 'choices[0].message.content');

      // Étape 3 : Traduction de la réponse
      const translatedValidationResult = await this.translate(
        validationResult,
        language,
      );

      /**
       * Vérifier si le message n'est pas une information ou s'il contient des informations fausses
       */
      const substrings = ['is not information', 'not an information'];
      const isNotInformation = some(substrings, (substring) =>
        includes(validationResult, substring),
      );

      if (isNotInformation) {
        return {
          username,
          message: translatedValidationResult,
          timestamp: new Date().toLocaleString(),
          status: 'incorrect',
        };
      }

      const isFalseInformation = includes(validationResult, 'false');
      if (isFalseInformation) {
        return {
          username,
          message: translatedValidationResult,
          timestamp: new Date().toLocaleString(),
          status: 'incorrect',
        };
      }

      return {
        username,
        message: translatedValidationResult,
        timestamp: new Date().toLocaleString(),
        status: 'correct',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
