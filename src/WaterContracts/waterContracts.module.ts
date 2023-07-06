import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { WaterContractEntity } from "./Models/waterContract.entity";
import { WaterContractService } from "./Services/WaterContracts.service";
import { WaterContractsRepository } from "./Repository/WaterContracts.repository";
import { WaterContractsController } from './Controllers/waterContracts.controller';
import { UserService } from 'src/User/services/user.service';
import { UserRepository } from 'src/User/repository/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([WaterContractEntity])
    ],
    providers: [
        UserService,
        UserRepository,
        WaterContractService,
        WaterContractsRepository
    ],
    controllers: [WaterContractsController]
})
export class WaterContractsModule {}