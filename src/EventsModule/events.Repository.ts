import { Injectable } from "@nestjs/common";
import { DataSource, EntitySchema, ObjectId, FindOptions } from "typeorm";
import { EventsEntity } from "./Entities/events.entity";

@Injectable()
export class EventsRepository {
    constructor(private dataSource: DataSource) {}


    async getEventById(id: ObjectId): Promise<EventsEntity> {
        const result = await this.dataSource.manager.findOne(EventsEntity, {
            where: {
                id: id
            },
        });

        return result;
    }

    getAllByUserId(userId: string): Promise<EventsEntity[]> {
        return this.dataSource.manager.find(EventsEntity, {
            where: {
                userId: userId
            },
            
        })
    }

    async getLatestByUserIdByDesc(userId: string): Promise<EventsEntity[]> {
        const result = await this.dataSource.manager.find(EventsEntity, {
            where: {
                userId: userId
            },
            order:{
                updatedAt: 'DESC'
            }
        })

        return result;
    }

    getAll(): Promise<EventsEntity[]> {
        return this.dataSource.manager.find(EventsEntity)
    }

    async getAllBetweenDates(eventType: string, startDate: Date, endDate: Date): Promise<EventsEntity[]> {
        try{
            const repository = this.dataSource.manager.getMongoRepository(EventsEntity);

            const result = await repository.find({
                where: {
                    type: eventType,
                    pickupAt: { $gte: startDate, $lte: endDate },
                },
            });
        
            return result;
        }catch(error: any){
            console.log(error)
        }
    }

    async CreateEvent(entity: EventsEntity): Promise<EventsEntity> {
        await this.dataSource.manager.insert(EventsEntity, entity);
        const output = await this.getLatestByUserIdByDesc(entity.userId);

        return output[0];
    }

    async UpdateEvent(entity: EventsEntity): Promise<EventsEntity> {
        
        const repository = this.dataSource.manager.getMongoRepository(EventsEntity);
        repository.save(entity);
        
        return entity;
    }

    async DeleteEvent(id: ObjectId) { 
        try{
            const repository = this.dataSource.manager.getMongoRepository(EventsEntity);
            await repository.delete(id)

            const res = await this.dataSource.manager.delete(EventsEntity, {id: id})
        }catch(error: any){
            console.log(error);
        }
    }
}