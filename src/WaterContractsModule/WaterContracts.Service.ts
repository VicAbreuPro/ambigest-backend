import { Injectable } from '@nestjs/common';
import { WaterContractsRepository } from './WaterContracts.Repository';
import { ObjectId } from "mongodb";
import { WaterContractResponseDto } from './Dtos/water-contract.response';
import { CreateContractRequest } from './Dtos/create-contract.request';
import { WaterContractEntity } from './Entities/waterContract.entity';

@Injectable()
export class WaterContractService {
    constructor(private waterContractRepository: WaterContractsRepository){}

    async getContractByUserId(userId: string): Promise<WaterContractResponseDto>{
        const result = await this.waterContractRepository.getContractByUserId(userId);
        if(result === null) throw new Error("User does not have a contract.");

        const output = result.toWaterContractResponseDto();
        return output;
    }

    async createContract(request: CreateContractRequest): Promise<WaterContractResponseDto>{
        
        const existent = await this.waterContractRepository.getContractByUserId(request.userId);
        if(existent !== null) throw new Error('User already has a contract');
        
        const toCreate: WaterContractEntity = {
            id: new ObjectId(),
            userId: request.userId,
            valuePerM3: request.valuePerM3,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as WaterContractEntity
        
        const result = await this.waterContractRepository.createContract(toCreate);
        
        return result.toWaterContractResponseDto();
    }
}