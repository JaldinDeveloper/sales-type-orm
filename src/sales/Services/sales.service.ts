import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { SalesDto } from '../Dtos/sale.dto';
import { DetailEntity } from '../Entities/details.entity';
import { SaleEntity } from '../Entities/sales.entity';

@Injectable()
export class SalesService {
    private queryRunner;
    constructor(
        @InjectRepository(SaleEntity) 
        private saleRepository: Repository<SaleEntity>,
        @InjectRepository(DetailEntity) 
        private detailsRepository: Repository<DetailEntity>,
        private _con: Connection
    ){
        this.queryRunner =  this._con.createQueryRunner();
    }

    async getAllSales() {
        return await this.saleRepository.find();
    }
    async createSale(sale: SalesDto) {
        const queryRunner = await this._con.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            // const newSale = new SaleEntity();
            // newSale.clientCI = sale.clientCI;
            // newSale.clientName = sale.clientName;
            // newSale.date =  new Date(Date.now());
            const saleCreated = await queryRunner.manager.create(SaleEntity, {
                clientCI: sale.clientCI,
                clientName: sale.clientName,
                date: new Date(Date.now()),

            });
            await this.saleRepository.save(saleCreated);        
            // sale.details.forEach(async detail => {
            //     await queryRunner.manager.create(DetailEntity, {
            //         cant: detail.cant,
            //         itemId: detail.itemId,
            //         description: detail.description,
            //         price: detail.price,
            //         sale: saleCreated
            //     });
            //     // const newDetail = new DetailEntity();
            //     // newDetail.description = detail.description;
            //     // newDetail.cant = detail.cant;
            //     // newDetail.itemId = detail.itemId;
            //     // newDetail.price = detail.price;
            //     // newDetail.sale = saleCreated;
            //     // await this.detailsRepository.save(newDetail);
            // });
            await queryRunner.commitTransaction();
            return saleCreated;
        } catch(error) {
            //await queryRunner.rollbackTransaction();
            throw new Error('Transaction failed');
        } finally {
            await queryRunner.release();
        }
    }
    // async createDetails(saleDetails: DetailEntity[]) {
        
    // }
}
