import { Controller, Post, Body, UseGuards, HttpCode, HttpException, HttpStatus } from '@nestjs/common';
import { CreateContractRequest } from './Dtos/create-contract.request';
import { WaterContractService } from './WaterContracts.Service';
import { FirebaseAuthGuard } from 'src/auth/firebase/firebase-auth.guard';

@Controller('water-contracts')
export class WaterContractsController {
  constructor(private readonly waterContractsService: WaterContractService) {}

  @Post('/')
  @UseGuards(FirebaseAuthGuard)
  @HttpCode(204)
  async create(@Body() request: CreateContractRequest): Promise<any>{
    try {
      var result = await this.waterContractsService.createContract(request);
      return result;
    } catch (error: any) {
        if(error === 'User already has a contract'){
          throw new HttpException('User already has a contract', HttpStatus.BAD_REQUEST);
        }

        throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}