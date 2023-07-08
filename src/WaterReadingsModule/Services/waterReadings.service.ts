import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { WaterReadingsRepository } from '../Repository/waterReadings.repository';
import { UserService } from 'src/User/services/user.service';
import { WaterReadingEntity } from '../Models/WaterReading.entity';

@Injectable()
export class WaterReadingsService {
    constructor(private waterReadingsRepository: WaterReadingsRepository){}

    @Inject()
    private readonly userService: UserService;

    async createReading(user_firebase_id: string, amount: number, date: Date): Promise<any>{
        const user = await this.userService.getUserByFirebaseId(user_firebase_id);

        const checkWaterReadings = await this.waterReadingsRepository.getAllReadingsByUserId(user._id.toString());

        if(checkWaterReadings){
            let inputDate = new Date(date);
            
            checkWaterReadings.forEach(reading => {
                let readingDate = new Date(reading.reading_date);

                if(readingDate.getFullYear() == inputDate.getFullYear() && readingDate.getMonth() + 1 == inputDate.getMonth() + 1){
                    throw new Error("User already registered a reading this month.");
                }
            });
        }

        const waterReading = new WaterReadingEntity(user._id.toString(), amount, date);

        return await this.waterReadingsRepository.upsertWaterReading(waterReading);
    }

    async updateReadingAmount(reading_id: string, user_firebase_id: string, amount: number): Promise<any>{
        const user = await this.userService.getUserByFirebaseId(user_firebase_id);

        const waterReading = await this.waterReadingsRepository.getUserWaterReading(reading_id, user._id.toString());

        if(! waterReading){
            throw new Error("Water reading not found!")
        }

        waterReading.amount = amount;

        return await this.waterReadingsRepository.upsertWaterReading(waterReading);
    }

    async deleteReading(reading_id: string, user_firebase_id: string): Promise<any>{
        const user = await this.userService.getUserByFirebaseId(user_firebase_id);

        const waterReading = await this.waterReadingsRepository.getUserWaterReading(reading_id, user._id.toString());

        if(! waterReading){
            throw new Error("Water reading not found!")
        }

        return await this.waterReadingsRepository.deleteWaterReading(waterReading);
    }

    async getWaterReadingsByUserFirebaseId(user_firebase_id: string): Promise<WaterReadingEntity[]>{
        const user = await this.userService.getUserByFirebaseId(user_firebase_id);

        return await this.waterReadingsRepository.getAllReadingsByUserId(user._id.toString());
    }
}