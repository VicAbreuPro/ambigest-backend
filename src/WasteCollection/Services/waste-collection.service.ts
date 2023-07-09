import { Inject, Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { WasteCollectionRepository } from '../Repository/waste-collection.repository';
import { WasteCollectionEntity } from '../Entities/waste-collection.entity';
import { UpdateWasteCollectionRequestDto } from '../Dtos/update-waste-collection.request';
import { UserService } from 'src/User/services/user.service';
import { throwError } from 'rxjs';

@Injectable()
export class WasteCollectionService {
    constructor(private WasteCollectionRepository: WasteCollectionRepository){}

    @Inject()
    private readonly userService: UserService;

    async getWasteCollectionsByUserId(userId: string): Promise<WasteCollectionEntity[]> {
        return await this.WasteCollectionRepository.getAllByUserId(userId);
    }

    async getWasteCollectionsByUserFirebaseId(user_firebase_id: string): Promise<WasteCollectionEntity[]> {
        const user = await this.userService.getUserByFirebaseId(user_firebase_id);

        return await this.getWasteCollectionsByUserId(user._id.toString());
    }

    async getWasteCollectionById(eventId: string): Promise<WasteCollectionEntity> {
        return await this.WasteCollectionRepository.getWasteCollection(new ObjectId(eventId));
    }

    async createWasteCollection(user_firebase_id: string, type: string, latitude: number, longitude: number, pickup_at: Date, time_of_day: string): Promise<WasteCollectionEntity> {
        const user = await this.userService.getUserByFirebaseId(user_firebase_id);
        const userWasteCollections = await this.getWasteCollectionsByUserId(user._id.toString());
        
        let inputDateObject = new Date(pickup_at);

        userWasteCollections.forEach(pickup => {
            let pickupDateObject = new Date(pickup.pickup_at);

            if(pickupDateObject.getFullYear() == inputDateObject.getFullYear() && pickupDateObject.getMonth() + 1 == inputDateObject.getMonth() + 1 && pickupDateObject.getDate() == inputDateObject.getDate()){
                throw new Error('Date already picked');
            }
        })

        const event = new WasteCollectionEntity(user._id.toString(), type, latitude, longitude, pickup_at, time_of_day);

        return await this.WasteCollectionRepository.upsertWasteCollection(event);
    }

    async updateWasteCollection(user_firebase_id: string, _id: string, type: string, pickup_at: Date, time_of_day: string): Promise<WasteCollectionEntity> {
        const user = await this.userService.getUserByFirebaseId(user_firebase_id);
        const userWasteCollection = await this.getWasteCollectionById(_id);
        const userWasteCollections = await this.getWasteCollectionsByUserId(user._id.toString());

        if(!userWasteCollection){
            throw new Error('Not found');
        }

        let inputDateObject = new Date(pickup_at);

        userWasteCollections.forEach(pickup => {
            let pickupDateObject = new Date(pickup.pickup_at);

            if(pickupDateObject.getFullYear() == inputDateObject.getFullYear() && pickupDateObject.getMonth() + 1 == inputDateObject.getMonth() + 1 && pickupDateObject.getDate() == inputDateObject.getDate()){
                if(pickup._id.toString() != userWasteCollection._id.toString()){
                    throw new Error('Date already picked');
                }
            }
        });

        userWasteCollection.pickup_at = pickup_at;
        userWasteCollection.type = type;
        userWasteCollection.time_of_day = time_of_day;

        return await this.WasteCollectionRepository.upsertWasteCollection(userWasteCollection);
    }

    async deleteWasteCollection(eventId: string) {
        const userWasteCollection = await this.getWasteCollectionById(eventId);

        if(! userWasteCollection){
            throw new Error('Waste-collection not found!');
        }

        return this.WasteCollectionRepository.deleteWasteCollectionById(new ObjectId(eventId));
    }
}