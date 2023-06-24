import { Double } from 'mongodb';
import { Column, ObjectIdColumn} from 'typeorm';
import { ObjectId } from 'mongodb'
import {Entity} from 'typeorm';
import { WaterReadingResponse } from '../Dtos/waterReading.response';

@Entity()
export class WaterReadingEntity {

    //TODO: Save pic of reading or something like that  

    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    userId: string;

    @Column()
    contractId: string;

    @Column()
    amount: number;

    @Column()
    createdAt: Date;
    
    @Column()
    updatedAt: Date;

}