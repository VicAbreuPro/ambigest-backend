import { Controller, Post, Body, UseGuards, HttpCode, HttpException, HttpStatus, Get, Request, Put } from '@nestjs/common';
import { CreateContractRequest } from '../Dtos/create-contract.request';
import { UpdateContractRequest } from '../Dtos/update-contract.request';
import { WaterContractService } from '../Services/WaterContracts.service';
import { FirebaseAuthGuard } from 'src/auth/firebase/firebase-auth.guard';
import { WaterContractEntity } from '../Models/waterContract.entity';
import { UserService } from 'src/User/services/user.service';

@Controller('water-contract')
export class WaterContractsController {
  constructor(private userService: UserService, private waterContractsService: WaterContractService) {}

  @Get('/')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(200)
  async getContract(@Request() req: any): Promise<WaterContractEntity>{
    try {
      return await this.waterContractsService.getContractByUserFirebaseId(req.user.uid);
    } catch (error) {
      if(error == 'Error: User does not have a contract.'){
        throw new HttpException('User does not have a contract', HttpStatus.NOT_FOUND);
      }

      throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Post('/')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(201)
  async create(@Request() req: any, @Body() requestBody: CreateContractRequest): Promise<any>{
    try {
      return await this.waterContractsService.createContract(req.user.uid, requestBody);
    } catch (error: any) {
        if(error === 'Error: User already has a contract.'){
          throw new HttpException('User already has a contract', HttpStatus.BAD_REQUEST);
        }

        throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  @Put('/')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(200)
  async updateContract(@Request() req: any, @Body() requestBody: UpdateContractRequest): Promise<any>{
    try {
      return await this.waterContractsService.updateContract(req.user.uid, requestBody);
    } catch (error) {
      throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}