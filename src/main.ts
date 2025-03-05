import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source/data.source';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  await AppDataSource.initialize()
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err));
}
bootstrap();
