import { filter, get, includes, map, some } from 'lodash';

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

  async suggestResponse(messages: []): Promise<string[]> {
    try {
      // Filtrage des messages pour exclure ceux de 'Cerebrix'
      const filteredMessages = filter(messages, (message) => {
        return get(message, 'username') !== 'Cerebrix';
      });

      // Construction du contexte de la discussion
      const discussionContext = map(filteredMessages, (msg) => {
        return `${get(msg, 'username')}: ${get(msg, 'message')}`;
      }).join('\n');

      // Utilisation de l'API d'OpenAI pour déterminer la langue du dernier message
      const lastMessage = get(
        filteredMessages[filteredMessages.length - 1],
        'message',
      );
      const languageResponse = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `What is the language of this message? "${lastMessage}". Just give the name of the language without single or double quotes and without explanation`,
          },
        ],
      });

      const lastMessageLanguage = get(
        languageResponse.choices[0].message,
        'content',
      );

      // Créer un prompt pour OpenAI
      const prompt = `Given the following conversation in ${lastMessageLanguage}:\n${discussionContext}\nSuggest three possible responses to the last message in ${lastMessageLanguage} : Each response mustn't have any numbering, bulleted lists or other numbering.`;

      // Envoyer le prompt à l'API d'OpenAI
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: prompt,
          },
        ],
      });

      // Extraction des suggestions de la réponse
      const suggestedResponses = get(response.choices[0].message, 'content')
        .split('\n')
        .slice(0, 3);

      return suggestedResponses;
    } catch (err) {
      throw new Error(err);
    }
  }
}
