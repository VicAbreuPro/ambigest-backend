import { Body, Controller, Get, HttpCode, Post, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import auth from "src/auth/firebase/firebaseInit";
import { Login } from '../Dto/login.request';

@Controller('auth')
export class AuthController {
    @Post('/login')
    @HttpCode(200)
    async login(@Body() requestBody: Login): Promise<string> {

        if(!requestBody.email || !requestBody.password){
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        }
        
        const token = await signInWithEmailAndPassword(auth, requestBody.email, requestBody.password);

        return token.user.getIdToken();
    }

    @Post('/recover-password')
    @HttpCode(204)
    async resetPassword(@Query('email') email: string): Promise<any> {

        if(!email){
            throw new HttpException('Unprocessable content', HttpStatus.UNPROCESSABLE_ENTITY);
        };
        
        try {
            await sendPasswordResetEmail(auth, email);
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
    logout(): any {
        signOut(auth).then(() => {}).catch((error) => {
            throw new HttpException('Server Error: ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }
}