import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { SalesDto } from '../Dtos/sale.dto';
import { SalesService } from '../Services/sales.service';

@Controller('sales')
export class SalesController {
    constructor(
        @Inject(SalesService)
        private saleService: SalesService
    ){}

    @Get()
    getAllSales() {
        return this.saleService.getAllSales();
    }
    @Post()
    createSale(@Body() saleData: SalesDto) 
    {
        return this.saleService.createSale(saleData);
    }
    
}
