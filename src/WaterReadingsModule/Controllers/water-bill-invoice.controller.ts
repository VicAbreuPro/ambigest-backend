import { Controller, Get, Post, Body, Request, UseGuards, HttpCode, HttpStatus, HttpException, Put, Delete, Query } from '@nestjs/common';
import { WaterReadingsService } from '../Services/waterReadings.service';
import { FirebaseAuthGuard } from 'src/auth/firebase/firebase-auth.guard';
import { WaterBillInvoiceEntity } from '../Models/water-bill-invoice.entity';

@Controller('water-bill-invoice')
export class WaterBillInvoiceController {
    constructor(private readonly waterReadingsService: WaterReadingsService) {}

    @Get('/')
    @UseGuards(FirebaseAuthGuard)
    async getInvoices(@Request() req: any): Promise<WaterBillInvoiceEntity[]> {
        try {
            const invoices = await this.waterReadingsService.getInvoicesByUser(req.user.uid);

            if( !invoices || invoices.length == 0){
                throw new Error('Not found');
            }

            return invoices;
        } catch (error) {
            if(error == 'Error: Not found'){
                throw new HttpException('No invoices found, please check if you have an confugred contract, or add new water reading data', HttpStatus.NOT_FOUND);
            }

            throw new HttpException('Server error: ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}