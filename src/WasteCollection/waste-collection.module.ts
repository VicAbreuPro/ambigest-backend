import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { WasteCollectionEntity } from './Entities/waste-collection.entity';
import { WasteCollectionService } from './Services/waste-collection.service';
import { WasteCollectionRepository } from './Repository/waste-collection.repository';
import { WasteCollectionController } from './Controllers/waste-collection.controller';
import { UserService } from 'src/User/services/user.service';
import { UserRepository } from 'src/User/repository/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([WasteCollectionEntity])
    ],
    providers: [
        UserService,
        UserRepository,
        WasteCollectionService,
        WasteCollectionRepository
    ],
    controllers: [
        WasteCollectionController
    ]
})
export class WasteCollectionModule {}