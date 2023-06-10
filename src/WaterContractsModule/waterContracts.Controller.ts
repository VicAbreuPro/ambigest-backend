import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { CreateContractRequest } from './Dtos/create-contract.request';
import { WaterContractService } from './WaterContracts.Service';
import { Response } from 'express';

@Controller('waterContracts')
export class WaterContractsController {
  constructor(private readonly waterContractsService: WaterContractService) {}

  @Post('createNew')
  async create(@Body() request: CreateContractRequest, @Res() res: Response){

    try {
      var result = await this.waterContractsService.createContract(request);
      res.status(200).json(JSON.stringify(result, null, 2));

    } catch (error: any) {
      res.status(400).json(JSON.stringify("Error: user already has a contract"));
    }
  }
}