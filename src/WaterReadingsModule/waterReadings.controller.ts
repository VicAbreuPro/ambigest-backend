import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { WaterReadingsService } from './waterReadings.service';
import { WaterReadingResponse } from './Dtos/waterReading.response';
import { GetReadingsRequest } from './Dtos/get-readings.request';
import { CreateReadingRequest } from './Dtos/create-reading.request';
import { ApiParam } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('waterReadings')
export class WaterReadingsController {
  constructor(private readonly waterReadingsService: WaterReadingsService) {}

  @Get('getAllByUserId/:userId')
  @ApiParam({ name: 'userId', description: 'User ID', type: String })
  async getAllByUserId(@Param() request: GetReadingsRequest, @Res() res: Response) {
    try{
      const result = await this.waterReadingsService.getAllByUserId(request.userId);
      res.status(200).json(JSON.stringify(result));
    }catch(error: any){
      res.status(400).json("Error: " + error.message);

    }
  }

  @Post('createNewReading')
  async create(@Body() request: CreateReadingRequest, @Res() res: Response) {
    try{
      const result = await this.waterReadingsService.createReading(request);
      res.status(200).json(JSON.stringify(result))
    
    } catch(error: any){
      res.status(400).json("Error: " + error.message);
    }
  }
}