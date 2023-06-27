import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WaterReadingsController } from "./waterReadings.controller";
import { WaterReadingsService } from "./waterReadings.service";
import { WaterReadingsRepository } from "./waterReadings.repository";
import { WaterReadingEntity } from "./Entities/WaterReading.entity";
import { WaterContractService } from 'src/WaterContractsModule/WaterContracts.Service';
import { WaterContractsRepository } from 'src/WaterContractsModule/WaterContracts.Repository';

@Module({
    imports: [TypeOrmModule.forFeature([WaterReadingEntity])],
    providers: [WaterReadingsService, WaterReadingsRepository, WaterContractService, WaterContractsRepository],
    controllers: [WaterReadingsController]
})
export class WaterReadingsModule {}