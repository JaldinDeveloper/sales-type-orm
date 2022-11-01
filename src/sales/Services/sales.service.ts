import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesDto } from '../Dtos/sale.dto';
import { DetailEntity } from '../Entities/details.entity';
import { SaleEntity } from '../Entities/sales.entity';
import { dataSource } from 'src/dataSource';

@Injectable()
export class SalesService {
    private queryRunner;
    constructor(){}

    async getAllSales() {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        return await queryRunner.manager.find(SaleEntity);
    }

    async createSale(sale: SalesDto) {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const newSale = new SaleEntity();
            newSale.clientCI = sale.clientCI;
            newSale.clientName = sale.clientName;
            newSale.date =  new Date(Date.now());
            const saleCreated = await queryRunner.manager.save(SaleEntity,{
                clientCI: sale.clientCI,
                clientName: sale.clientName,
                date: new Date(Date.now())
            });
            //await this.saleRepository.save(saleCreated);        
            sale.details.forEach(async detail => {

                await queryRunner.manager.save(DetailEntity,{
                    cant: detail.cant,
                    itemId: detail.itemId,
                    description: detail.description,
                    price: detail.price,
                    sale: saleCreated
                });
            });
            await queryRunner.commitTransaction();
            return saleCreated;
        } catch(error) {
            await queryRunner.rollbackTransaction();
            throw new Error('Transaction failed');
            
        } finally {
            await queryRunner.release();
        }
    }

    async updateSale(clientCI:string, clientName:string, saleId:string) {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            
            const saleCreated = await queryRunner.manager.update(SaleEntity, saleId, {
                clientCI: clientCI,
                clientName: clientName
            })
            
            await queryRunner.commitTransaction();
            return saleCreated;
        } catch(error) {
            await queryRunner.rollbackTransaction();
            throw new Error('Transaction failed');
            
        } finally {
            await queryRunner.release();
        }
    }
    
}
