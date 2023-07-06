import { Column, ObjectIdColumn, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class WaterContractEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  user_id: string;

  @Column()
  value_per_m3: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(user_id: string, value_per_m3: number){
    this.user_id = user_id;
    this.value_per_m3 = value_per_m3;
  };
}