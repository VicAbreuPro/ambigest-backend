import { Entity, Column, ObjectId, ObjectIdColumn } from 'typeorm';
  
@Entity()
export class UserEntity {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    firebase_id: string;

    @Column()
    username: string;

    @Column()
    email: string;

    constructor(username: string, email: string, firebase_id: string) {
        this.username = username;
        this.email = email;
        this.firebase_id = firebase_id;
    }
}
