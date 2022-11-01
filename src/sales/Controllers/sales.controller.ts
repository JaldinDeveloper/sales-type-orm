import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
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
    @Put(':id')
    updateSale(
        @Param('id') id: string,
        @Body() saleData: SalesDto,
    ) {
        return this.saleService.updateSale(saleData.clientCI, saleData.clientName, id);
    }
    @Delete(':id')
    deleteSale(@Param('id') id: string) {
        return this.saleService.deleteSale(id);
      }
}
