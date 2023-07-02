import { Body, Controller, HttpCode, Post, UseGuards, HttpException, HttpStatus, Query, Headers } from '@nestjs/common';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import firebaseAuth from "src/auth/firebase/firebaseInit";
import { Login } from '../Dto/login.request';
import { auth } from 'firebase-admin';


@Controller('auth')
export class AuthController {
    @Post('/login')
    @HttpCode(200)
    async login(@Body() requestBody: Login): Promise<any> {

        let token: string;
        let extractedUserEmail: string;

        if(!requestBody.email || !requestBody.password){
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
        
        try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, requestBody.email, requestBody.password);

            token = await userCredential.user.getIdToken();
            extractedUserEmail = userCredential.user.email;

        } catch (error) {
            if(error.code == 'auth/user-not-found'){
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            throw new HttpException('Server error' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }

        let data = {
            token: token,
            email: extractedUserEmail
        };
          
        return JSON.stringify(data);
    }

    @Post('/recover-password')
    @HttpCode(204)
    async resetPassword(@Query('email') email: string): Promise<any> {

        if(!email){
            throw new HttpException('Unprocessable content', HttpStatus.UNPROCESSABLE_ENTITY);
        };
        
        try {
            await sendPasswordResetEmail(firebaseAuth, email);
        } catch (error) {
            if(error.code == 'auth/user-not-found'){
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            console.log(error);
        }

        return '';
    }

    @Post('/logout')
    @UseGuards(FirebaseAuthGuard)
    @HttpCode(204)
    async logout(@Headers('authorization') authorization: string): Promise<any> {
        try {
            const token = authorization.split(' ')[1];

            const decodedToken = await auth().verifyIdToken(token);

            await auth().revokeRefreshTokens(decodedToken.uid);
        } catch (error) {
            throw new HttpException('Server error' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
        return '';
    }
}