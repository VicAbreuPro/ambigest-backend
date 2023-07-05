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

    async getUser(email: string): Promise<UserEntity>{
        return await this.dataSource.manager.findOne( UserEntity, {
            where: {
                email: email
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

    async updateEmailProperty(userId: ObjectId, email: string): Promise<UserEntity>{
        const user = await this.dataSource.manager.findOne(UserEntity, { where: { _id: new ObjectId(userId) } });

        if (!user) {
            throw new Error('User not found');
        }
            
        user.email = email;

        const updatedUser = await this.dataSource.manager.save(user);

        return updatedUser;
    }

    async updateUsernameProperty(userId: ObjectId, username: string): Promise<UserEntity>{
        const user = await this.dataSource.manager.findOne(UserEntity, { where: { _id: new ObjectId(userId) } });

        if (!user) {
            throw new Error('User not found');
        }
            
        user.username = username;

        const updatedUser = await this.dataSource.manager.save(user);

        return updatedUser;
    }

    async deleteUser(userId: ObjectId){
        return await this.dataSource.manager.delete(UserEntity, userId);
    }
}