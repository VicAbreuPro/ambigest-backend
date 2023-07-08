import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WaterReadingsController } from "./Controllers/waterReadings.controller";
import { WaterReadingsService } from "./Services/waterReadings.service";
import { WaterReadingsRepository } from "./Repository/waterReadings.repository";
import { WaterReadingEntity } from "./Models/WaterReading.entity";
import { WaterContractService } from 'src/WaterContracts/Services/WaterContracts.service';
import { WaterContractsRepository } from 'src/WaterContracts/Repository/WaterContracts.repository';
import { UserService } from 'src/User/services/user.service';
import { UserRepository } from 'src/User/repository/user.repository';
import { WaterBillInvoiceRepository } from './Repository/water-bill-invoice.repository';
import { WaterBillInvoiceEntity } from './Models/water-bill-invoice.entity';
import { WaterBillInvoiceController } from './Controllers/water-bill-invoice.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([WaterReadingEntity, WaterBillInvoiceEntity])
    ],
    providers: [
        UserService,
        UserRepository,
        WaterBillInvoiceRepository,
        WaterReadingsService,
        WaterReadingsRepository,
        WaterContractService,
        WaterContractsRepository
    ],
    controllers: [
        WaterBillInvoiceController,
        WaterReadingsController
    ]
})
export class WaterReadingsModule {}