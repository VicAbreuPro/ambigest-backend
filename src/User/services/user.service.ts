import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserRequestDto } from '../Dtos/create-users.request';
import { Login } from 'src/auth/Dto/login.request';
import { UserEntity } from '../models/user.entity';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import auth from "src/auth/firebase/firebaseInit";
import * as admin from 'firebase-admin';
import { signInWithEmailAndPassword } from "firebase/auth";

@Injectable()
export class UserService {
    constructor(
        private UserRepository: UserRepository
    ) {}

    async getUser(email: string): Promise<UserEntity>{
        return await this.UserRepository.getUser(email);
    }

    async createUserOnDatabase(email: string): Promise<any>{
        const checkUsername = await this.UserRepository.getUser(email);

        if(checkUsername){
            throw new Error('Username already exists');
        }

        let username = email.split('@')[0];

        // Create user on database
        let userWithoutPassword = new UserEntity(username, email);

        return await this.UserRepository.createUser(userWithoutPassword);
    }

    async createUserOnFirebase(newUser: CreateUserRequestDto): Promise<any>{
        // Create User on firebase
        const user = await createUserWithEmailAndPassword( auth, newUser.email, newUser.password );

        await sendEmailVerification(user.user);

        
    }

    async updateUserEmail(uid: string, password: string, oldEmail: string, newEmail: string): Promise<any>{
        const userFromDB = await this.UserRepository.getUser(oldEmail);

        if (!userFromDB) {
            throw new Error('User not found');
        }

        await admin.auth().updateUser(uid, {
            email: newEmail,
            emailVerified: false
        });

        const user = await signInWithEmailAndPassword(auth, newEmail, password);

        await sendEmailVerification(user.user);

        await this.UserRepository.updateEmailProperty(userFromDB._id, newEmail);
    }

    async updateUsername(email: string, username: string): Promise<any>{
        const userFromDB = await this.UserRepository.getUser(email);

        if (!userFromDB) {
            throw new Error('User not found');
        }

        return await this.UserRepository.updateUsernameProperty(userFromDB._id, username);
    }

    async deleteUser(firebaseUserId: string, email: string): Promise<any>{
        const userFromDB = await this.UserRepository.getUser(email);

        await admin.auth().deleteUser(firebaseUserId);

        return await this.UserRepository.deleteUser(userFromDB._id);
    }
}