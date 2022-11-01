import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesController } from './Controllers/sales.controller';
import { DetailEntity } from './Entities/details.entity';
import { SaleEntity } from './Entities/sales.entity';
import { SalesService } from './Services/sales.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetailEntity,SaleEntity])],
  controllers: [SalesController],
  providers: [SalesService]
})
export class SalesModule {}
