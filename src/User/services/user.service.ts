import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserRequestDto } from '../Dtos/create-users.request';
import { UserEntity } from '../models/user.entity';
import { createUserWithEmailAndPassword, deleteUser, getAuth} from "firebase/auth";
import auth from "src/auth/firebase/firebaseInit";
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
    constructor(
        private UserRepository: UserRepository
    ) {}

    async getUser(email: string): Promise<UserEntity>{
        return await this.UserRepository.getUser(email);
    }

    async createUser(newUser: CreateUserRequestDto): Promise<any>{
        const checkUsername = await this.UserRepository.getUserByUsername(newUser.username);

        if(checkUsername){
            throw new Error('Username already exists');
        }

        // Create User on firebase
        await createUserWithEmailAndPassword( auth, newUser.email, newUser.password );

        // Create user on database
        let userWithoutPassword = new UserEntity(newUser.username, newUser.email);

        userWithoutPassword.email = newUser.email;
        userWithoutPassword.username = newUser.username;

        return await this.UserRepository.createUser(userWithoutPassword);
    }

    async updateUser(email: string, column: string, value:string): Promise<any>{
        const userFromDB = await this.UserRepository.getUser(email);

        if (!userFromDB) {
            throw new Error('User not found');
        }

        if(column === 'email'){
            // Find the user by current email
            const userRecord = await admin.auth().getUserByEmail(email);

            // Update the user's email
            await admin.auth().updateUser(userRecord.uid, {
                email: value,
            });
        }
        return await this.UserRepository.updateUserProperty(userFromDB._id, column, value);
    }

    async deleteUser(firebaseUserId: string, email: string): Promise<any>{
        const userFromDB = await this.UserRepository.getUser(email);

        await admin.auth().deleteUser(firebaseUserId);

        return await this.UserRepository.deleteUser(userFromDB._id);
    }
}