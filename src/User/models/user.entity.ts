import { Entity, PrimaryGeneratedColumn, Column, ObjectId, ObjectIdColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
  
@Entity()
export class UserEntity {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    username: string;

    @Column()
    email: string;

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }
}
