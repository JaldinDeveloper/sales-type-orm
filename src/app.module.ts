import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'salesdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    SalesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
