import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { WaterReadingsRepository } from './waterReadings.repository';
import { CreateReadingRequest } from './Dtos/create-reading.request';
import { WaterContractService } from 'src/WaterContractsModule/WaterContracts.Service';
import { WaterReadingEntity } from './Entities/WaterReading.entity';
import { WaterReadingResponse } from './Dtos/waterReading.response';

@Injectable()
export class WaterReadingsService {
    constructor(private waterReadingsRepository: WaterReadingsRepository){}

    @Inject()
    private readonly contractsService: WaterContractService;

    async createReading(dto: CreateReadingRequest): Promise<WaterReadingResponse>{
        const contract = await this.contractsService.getContractByUserId(dto.userId);
        if(contract === null) throw new Error("User does not have any contract.");

        const reading: WaterReadingEntity = {
            id: new ObjectId(),
            userId: dto.userId,
            contractId: contract.id.toString(),
            amount: dto.amount,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const latest = await this.waterReadingsRepository.getLatestByUserId(dto.userId);
        if(latest !== null && latest.updatedAt.getMonth === new Date().getMonth)
            throw new Error("User already registered a reading this month.")

        const result = await this.waterReadingsRepository.createReading(reading);

        const output: WaterReadingResponse = {
            id: result.id,
            userId: result.userId,
            contractId: result.contractId,
            amount: result.amount,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        };

        return output;
    }

    async getAllByUserId(userId: string): Promise<WaterReadingResponse[]>{
        const contract = await this.contractsService.getContractByUserId(userId);

        if(contract === null) throw new Error("User does not have a water contract plan.");

        const result = await this.waterReadingsRepository.getReadingsByUserId(userId);
        console.log("Passa aqui1");

        var output: WaterReadingResponse[] = [];

        result.forEach((element) => {
            const reading: WaterReadingResponse = {
                id: element.id,
                userId: element.userId,
                contractId: contract.id.toString(),
                amount: element.amount,
                createdAt: element.createdAt,
                updatedAt: element.updatedAt,
            }

            output.push(reading);
        });

        return output;
    }
}