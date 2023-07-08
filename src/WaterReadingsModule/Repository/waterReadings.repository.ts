import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { WaterReadingEntity } from "../Models/WaterReading.entity";
import { ObjectId } from "mongodb";

@Injectable()
export class WaterReadingsRepository {
    constructor(private dataSource: DataSource) {}

    getAllReadingsByUserId(user_id: string): Promise<WaterReadingEntity[]>{
        return this.dataSource.manager.find(WaterReadingEntity, {
            select: ['amount', 'reading_date'],
            where: {
                user_id
            }
        });
    }

    getUserWaterReading(id: string, user_id: string): Promise<WaterReadingEntity>{
        return this.dataSource.manager.findOne(WaterReadingEntity, {
            where: {
                _id: new ObjectId(id),
                user_id
            }
        });
    }

    async upsertWaterReading(reading: WaterReadingEntity): Promise<WaterReadingEntity>{
        let result = await this.dataSource.manager.save(WaterReadingEntity, reading);

        return await this.dataSource.manager.findOne(WaterReadingEntity, {
            select: ['amount', 'reading_date'],
            where: {
                _id: result._id
            }
        });
    }

    async deleteWaterReading(reading: WaterReadingEntity): Promise<any>{
        return await this.dataSource.manager.delete(WaterReadingEntity, reading);
    }
}