import { Column, ObjectIdColumn, Entity } from 'typeorm';
import { ObjectId } from 'mongodb'

@Entity()
export class EventsEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userId: string;

  @Column()
  type: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  pickupAt: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}