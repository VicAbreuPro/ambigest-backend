import { Injectable } from "@nestjs/common";
import { DataSource, ObjectId } from "typeorm";
import { WasteCollectionEntity } from "../Entities/waste-collection.entity";

@Injectable()
export class WasteCollectionRepository {
    constructor(private dataSource: DataSource) {}

    async getWasteCollection(id: ObjectId): Promise<WasteCollectionEntity> {
        return await this.dataSource.manager.findOne(WasteCollectionEntity, {
            select: ['type', "latitude", "longitude", "pickup_at", "time_of_day", "userId"],
            where: {
                _id: id
            },
        });
    }

    async getAllByUserId(userId: string): Promise<WasteCollectionEntity[]> {
        return await this.dataSource.manager.find(WasteCollectionEntity, {
            select: ['type', "latitude", "longitude", "pickup_at", "time_of_day"],
            where: {
                userId: userId
            },
        });
    }

    async upsertWasteCollection(entity: WasteCollectionEntity): Promise<WasteCollectionEntity> {
        const result = await this.dataSource.manager.save(WasteCollectionEntity, entity);

        return await this.dataSource.manager.findOne(WasteCollectionEntity, {
            select: ['type', "latitude", "longitude", "pickup_at", "time_of_day"],
            where: {
                _id: result._id
            }
        });
    }

    async deleteWasteCollectionById(id: ObjectId) { 
        return await this.dataSource.manager.delete(WasteCollectionEntity, id);
    }
}