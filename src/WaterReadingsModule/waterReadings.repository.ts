import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { WaterReadingEntity } from "./Entities/WaterReading.entity";
import { ObjectId } from "mongodb";

@Injectable()
export class WaterReadingsRepository {
    constructor(private dataSource: DataSource) {}

    getReadingsByUserId(userId: string): Promise<WaterReadingEntity[]>{
        return this.dataSource.manager.find(WaterReadingEntity, {
            where: {
                userId: userId
            }
        })
    }

    getLatestByUserId(userId: string): Promise<WaterReadingEntity>{
        return this.dataSource.manager.findOne(WaterReadingEntity, {
            where: {
                userId: userId,
            },
            order: {
                createdAt: 'desc',
            },
        });
    }

    async createReading(reading: WaterReadingEntity): Promise<WaterReadingEntity>{
        const result = await this.dataSource.manager.insert(WaterReadingEntity, reading);
        return this.getLatestByUserId(reading.userId);
    }
}