import { Controller, Get, Post, Body, Request, UseGuards, HttpCode, HttpStatus, HttpException, Put, Delete, Query } from '@nestjs/common';
import { WaterReadingsService } from '../Services/waterReadings.service';
import { CreateReadingRequest } from '../Dtos/create-reading.request';
import { UpdateReadingRequest } from '../Dtos/update-reading.request';
import { FirebaseAuthGuard } from 'src/auth/firebase/firebase-auth.guard';

@Controller('water-readings')
export class WaterReadingsController {
  constructor(private readonly waterReadingsService: WaterReadingsService) {}

  @Get('/')
  @UseGuards(FirebaseAuthGuard)
  async getWaterReadings(@Request() req: any): Promise<any> {
    try{
      return await this.waterReadingsService.getWaterReadingsByUserFirebaseId(req.user.uid);
    }catch(error){
      throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Post('/')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(201)
  async createWaterReading(@Request() req: any, @Body() requestBody: CreateReadingRequest): Promise<any> {
    try{
      return await this.waterReadingsService.createReading(req.user.uid, requestBody.amount, requestBody.reading_date);
    
    } catch(error){
      if(error == 'Error: User already registered a reading this month.'){
        throw new HttpException('User already registered a reading this month.', HttpStatus.BAD_REQUEST);
      }

      if(error == 'Error: The new water reading date must be after than the last water reading.'){
        throw new HttpException('The new water reading date must be after than the last water reading.', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException('Server error: ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete('/')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(204)
  async deleteWaterReading(@Request() req: any, @Query('id') reading_id: string): Promise<any> {
    if(! reading_id){
      throw new HttpException('id is required!', HttpStatus.BAD_REQUEST);
    }

    try{
      return await this.waterReadingsService.deleteReading(reading_id, req.user.uid);
    
    } catch(error){
      if(error == 'Error: Water reading not found!'){
        throw new HttpException('Water reading not found!', HttpStatus.BAD_REQUEST);
      }

      if(error == "BSONError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"){
        throw new HttpException('Invalid ID!', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}