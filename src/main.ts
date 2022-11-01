import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './dataSource';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  await dataSource.initialize()
}
bootstrap();
