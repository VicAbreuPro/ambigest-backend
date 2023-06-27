import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WaterContractEntity } from "./Entities/waterContract.entity";
import { WaterContractService } from "./WaterContracts.Service";
import { WaterContractsRepository } from "./WaterContracts.Repository";
import { WaterContractsController } from './waterContracts.Controller';

@Module({
    imports: [TypeOrmModule.forFeature([WaterContractEntity])],
    providers: [WaterContractService, WaterContractsRepository],
    controllers: [WaterContractsController]
})
export class WaterContractsModule {}