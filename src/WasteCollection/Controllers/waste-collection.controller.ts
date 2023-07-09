import { Controller, Get, Post, Put, Body, Param, Res, Delete, UseGuards, HttpCode, HttpException, HttpStatus, Request, Query } from '@nestjs/common';
import { CreateWasteCollectionRequestDto } from '../Dtos/create-waste-collection.request';
import { WasteCollectionService } from '../Services/waste-collection.service';
import { UpdateWasteCollectionRequestDto } from '../Dtos/update-waste-collection.request';
import { FirebaseAuthGuard } from 'src/auth/firebase/firebase-auth.guard';
import { WasteCollectionEntity } from '../Entities/waste-collection.entity';

@Controller('waste-collection')
export class WasteCollectionController { 
    constructor(private readonly WasteCollectionService: WasteCollectionService) {}

    @Get('/')
    @UseGuards(FirebaseAuthGuard)
    async getWasteCollections(@Request() req: any): Promise<WasteCollectionEntity[]>{
        try {
            return await this.WasteCollectionService.getWasteCollectionsByUserFirebaseId(req.user.uid);
        }catch(error: any) {
            throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Get('/detail')
    @UseGuards(FirebaseAuthGuard)
    async getWasteCollection(@Query('id') wasteCollectionId: string): Promise<WasteCollectionEntity>{
        if(! wasteCollectionId){
            throw new HttpException('id is required', HttpStatus.BAD_REQUEST);
        }

        try {
            const result = await this.WasteCollectionService.getWasteCollectionById(wasteCollectionId);
            if(! result){
                throw new Error('Waste-collection not found!');
            }
            return result;
        }catch(error) {
            if(error == 'Error: Waste-collection not found!'){
                throw new HttpException('Waste-collection not found!', HttpStatus.NOT_FOUND);
            }

            throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Post('/')
    @UseGuards(FirebaseAuthGuard)
    @HttpCode(201)
    async createWasteCollection(@Request() req: any, @Body() requestBody: CreateWasteCollectionRequestDto): Promise<WasteCollectionEntity>{
        try{
            var result = await this.WasteCollectionService.createWasteCollection(req.user.uid, requestBody.type, requestBody.latitude, requestBody.longitude, requestBody.pickup_at, requestBody.time_of_day)
            return result;

        } catch(error) {
            if(error == 'Error: Date already picked'){
                throw new HttpException('Date already picked', HttpStatus.BAD_REQUEST);
            }

            throw new HttpException('Server error: ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('/')
    @UseGuards(FirebaseAuthGuard)
    @HttpCode(200)
    async update(@Request() req: any, @Body() requestBody: UpdateWasteCollectionRequestDto): Promise<any>{
        try{
            return await this.WasteCollectionService.updateWasteCollection(req.user.uid, requestBody.id, requestBody.type, requestBody.pickup_at, requestBody.time_of_day);
        }catch(error) {
            if(error == 'Error: Date already picked'){
                throw new HttpException('Date already picked', HttpStatus.BAD_REQUEST);
            }

            if(error === 'Error: Not found'){
                throw new HttpException('ID not found', HttpStatus.BAD_REQUEST);
            }

            throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Delete('/')
    @UseGuards(FirebaseAuthGuard)
    @HttpCode(204)
    async deleteEventById(@Query('id') wasteCollectionId: string): Promise<any>{
        try {
            return await this.WasteCollectionService.deleteWasteCollection(wasteCollectionId);
        }catch(error) {
            if(error == 'Error: Waste-collection not found!'){
                throw new HttpException('Waste-collection not found!', HttpStatus.NOT_FOUND);
            }

            throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

}