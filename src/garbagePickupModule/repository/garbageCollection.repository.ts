import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { GarbageCollectionEntity } from "../models/garbagePickup.entity";
import { ObjectId } from "mongodb";

@Injectable()
export class GarbageCollectionRepository {
    constructor(private dataSource: DataSource) {}

    getCollectionsByUserId(userId: string): Promise<GarbageCollectionEntity[]>{
        return this.dataSource.manager.find(GarbageCollectionEntity, {
            where: {
                userId: userId
            }
        })
    }

    getCollectionByDate(dateTime: Date): Promise<GarbageCollectionEntity> {
        return this.dataSource.manager.findOne(GarbageCollectionEntity, {
            where: {
                pickupDate: dateTime
            }
        })
    }

    getCollectionById(id: string): Promise<GarbageCollectionEntity>{
        const objectId = new ObjectId(id);

        return this.dataSource.manager.findOne(GarbageCollectionEntity, {
            where: {
                id: objectId
            }
        })
    }

    getLatestByUserId(userId: string): Promise<GarbageCollectionEntity>{
        return this.dataSource.manager.findOne(GarbageCollectionEntity, {
            where: {
                userId: userId,
            },
            order: {
                createdAt: 'desc',
            },
        });
    }

    async createGarbageCollectionPickup(garbage: GarbageCollectionEntity): Promise<GarbageCollectionEntity>{
        const result = await this.dataSource.manager.insert(GarbageCollectionEntity, garbage);
        return this.getLatestByUserId(garbage.userId);
    }

    async updateGarbageCollectionPickup(garbage: GarbageCollectionEntity): Promise<GarbageCollectionEntity> {
        const result = await this.dataSource.manager.update(GarbageCollectionEntity, garbage.id, garbage);
        return this.getLatestByUserId(garbage.userId);
    }

    deleteGarbageCollectionPickup(id: string){
        this.dataSource.manager.delete(GarbageCollectionEntity, id);
    }

    getAll(): Promise<GarbageCollectionEntity[]> {
        return this.dataSource.manager.find(GarbageCollectionEntity);
    }
}