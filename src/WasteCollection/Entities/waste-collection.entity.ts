import { Column, ObjectIdColumn, Entity, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb'

@Entity()
export class WasteCollectionEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  userId: string;

  @Column()
  type: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  pickup_at: Date;

  @Column()
  time_of_day: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor(userId: string, type: string, latidute: number, longitude: number, pickup_at: Date, time_of_day: string){
    this.userId = userId;
    this.type = type;
    this.latitude = latidute;
    this.longitude = longitude;
    this.pickup_at = pickup_at;
    this.time_of_day = time_of_day;
  }
}