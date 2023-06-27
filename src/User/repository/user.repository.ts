import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { UserEntity } from "../models/user.entity";
import { ObjectId } from 'mongodb';

@Injectable()
export class UserRepository {
    constructor(private dataSource: DataSource) {}

    async getUserByUsername(username: string): Promise<UserEntity>{
        return await this.dataSource.manager.findOne( UserEntity, {
            where: {
                username: username
            }
        });
    }

    async getUserById(userId: string): Promise<UserEntity>{
        return await this.dataSource.manager.findOne( UserEntity, {
            where: {
                _id: new ObjectId(userId)
            }
        });
    }

    async createUser(user: UserEntity): Promise<UserEntity>{
        
        const result = await this.dataSource.manager.save(UserEntity, user);

        return await this.dataSource.manager.findOne(UserEntity, {
            where: {
                _id: result._id
            }
        });
    }

    async updateUserProperty(userId: ObjectId, column: string, value: string): Promise<UserEntity>{
        const user = await this.dataSource.manager.findOne(UserEntity, { where: { _id: new ObjectId(userId) } });

        if (!user) {
            throw new Error('User not found');
        }

        if (column == 'username') {
            
            user.username = value;
        } else if (column === 'email') {
            user.email = value;
        }

        const updatedUser = await this.dataSource.manager.save(user);

        return updatedUser;
    }

    async deleteUser(userId: string){
        return await this.dataSource.manager.delete(UserEntity, new ObjectId(userId));
    }
}