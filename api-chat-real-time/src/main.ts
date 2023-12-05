import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Permet le partage de ressources entre origines (CORS) avec une origine spécifique.
   *
   * @param {Object} options - L'objet de configuration pour CORS.
   * @param {string[]} options.origin - Tableau des domaines d'origine autorisés.
   */

  app.enableCors({
    origin: ['http://localhost:3000'],
  });
  await app.listen(8001);
}
bootstrap();
