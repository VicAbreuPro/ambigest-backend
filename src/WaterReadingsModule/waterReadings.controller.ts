import { Controller, Get, Post, Body, Param, Res, UseGuards, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { WaterReadingsService } from './waterReadings.service';
import { GetReadingsRequest } from './Dtos/get-readings.request';
import { CreateReadingRequest } from './Dtos/create-reading.request';
import { ApiParam } from '@nestjs/swagger';
import { FirebaseAuthGuard } from 'src/auth/firebase/firebase-auth.guard';

@Controller('waterReadings')
export class WaterReadingsController {
  constructor(private readonly waterReadingsService: WaterReadingsService) {}

  @Get('getAllByUserId/:userId')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(204)
  @ApiParam({ name: 'userId', description: 'User ID', type: String })
  async getAllByUserId(@Param() request: GetReadingsRequest): Promise<any> {
    try{
      const result = await this.waterReadingsService.getAllByUserId(request.userId);
      return result;
    }catch(error: any){
      if(error === 'User does not have a water contract plan.'){
        throw new HttpException('User does not have a water reading plan', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Post('create')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(204)
  async create(@Body() request: CreateReadingRequest): Promise<any> {
    try{
      const result = await this.waterReadingsService.createReading(request);
      return result;
    
    } catch(error: any){
      if(error === 'User does not have any contract.'){
        throw new HttpException('User does not have a water reading plan', HttpStatus.BAD_REQUEST);
      }
      else if(error === 'User already registered a reading this month.'){
        throw new HttpException('User already registered a reading this month.', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}