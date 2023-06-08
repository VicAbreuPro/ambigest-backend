import { Injectable } from '@nestjs/common';
import { GarbageCollectionRepository } from '../repository/garbageCollection.repository';
import { CreateGarbagePickupRequestDto } from '../Dtos/create-garbagePickup.request';

@Injectable()
export class GarbageCollectionService {
    constructor(
        private garbageCollectionRepository: GarbageCollectionRepository
    ) {}


    async CreateUser(newPickupModel: CreateGarbagePickupRequestDto): Promise<> {
       // Check if there is no pickup order for that date and time
        this.garbageCollectionRepository.getCollectionByDate(newPickupModel.pickupDate);

       // Insert pickup

       // Return pickup
    }

}