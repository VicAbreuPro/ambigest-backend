import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarbageCollectionEntity } from './models/garbagePickup.entity';
import { GarbageCollectionService } from './services/garbagePickup.service';
import { GarbageCollectionRepository } from './repository/garbageCollection.repository';
import { GarbageCollectionController } from './controllers/garbagePickup.controller';

@Module({
    imports: [TypeOrmModule.forFeature([GarbageCollectionEntity])],
    providers: [GarbageCollectionService, GarbageCollectionRepository],
    controllers: [GarbageCollectionController]
})
export class GarbageCollectionModule {}