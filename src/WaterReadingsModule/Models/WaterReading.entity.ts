import { Column, ObjectIdColumn, CreateDateColumn, UpdateDateColumn, Entity} from 'typeorm';
import { ObjectId } from 'mongodb'

@Entity()
export class WaterReadingEntity {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    user_id: string;

    @Column()
    amount: number;

    @Column()
    reading_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(user_id: string, amount: number, reading_date: Date){
        this.user_id = user_id;
        this.amount = amount;
        this.reading_date = reading_date;
    }
}