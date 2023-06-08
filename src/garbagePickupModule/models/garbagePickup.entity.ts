import { Double } from 'mongodb';
import { Col } from 'sequelize/types/utils';
import { Column, ObjectIdColumn, ObjectId } from 'typeorm';
import {Entity} from 'typeorm';

@Entity()
export class GarbageCollectionEntity {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    userId: string;

    @Column()
    type: string;

    @Column()
    latitude: Double;
    
    @Column()
    longitude: Double;

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @Column()
    pickupDate: Date

}