import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { CreateUserRequestDto } from '../Dtos/create-users.request';
import { UserEntity } from '../models/user.entity';
import { createUserWithEmailAndPassword, sendEmailVerification, verifyBeforeUpdateEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "src/auth/firebase/firebaseInit";
import * as admin from 'firebase-admin';
import { ObjectId } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private UserRepository: UserRepository
    ) {}

    async getUser(email: string): Promise<UserEntity>{
        return await this.UserRepository.getUser(email);
    }

    async getUserByFirebaseId(uid: string): Promise<UserEntity>{
        return await this.UserRepository.getUserByFirebaseId(uid);
    }

    async createUserOnDatabase(uid: string, email: string): Promise<any>{
        let username = email.split('@')[0];

        // Create user on database
        let userWithoutPassword = new UserEntity(username, email, uid);

        return await this.UserRepository.createUser(userWithoutPassword);
    }

    async createUserOnFirebase(newUser: CreateUserRequestDto): Promise<any>{
        // Create User on firebase
        const user = await createUserWithEmailAndPassword( auth, newUser.email, newUser.password );

        await sendEmailVerification(user.user);
    }

    async updateUserEmail(user_id: ObjectId, new_email: string): Promise<any>{
        return await this.UserRepository.updateEmailProperty(user_id, new_email);
    }

    async updateUserEmailFirebase(password: string, oldEmail: string, newEmail: string): Promise<any>{
        const currentUser = await signInWithEmailAndPassword(auth, oldEmail, password);

        return await verifyBeforeUpdateEmail(currentUser.user, newEmail);
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