import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { EventsEntity } from './Entities/events.entity';
import { EventsService } from './events.Service';
import { EventsRepository } from './events.Repository';
import { EventsController } from './events.Controller';

@Module({
    imports: [TypeOrmModule.forFeature([EventsEntity])],
    providers: [EventsService, EventsRepository],
    controllers: [EventsController]
})
export class EventsModule {}