import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source/data.source';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
  await AppDataSource.initialize()
    .then(() => logger.log('Data source initialized'))
    .catch((err) => logger.error(err));
}
void bootstrap();
