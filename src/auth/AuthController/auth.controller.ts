import { Body, Controller, HttpCode, Post, UseGuards, HttpException, HttpStatus, Query, Headers, Put, Request } from '@nestjs/common';
import { signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import firebaseAuth from "src/auth/firebase/firebaseInit";
import { Login } from '../Dto/login.request';
import { auth } from 'firebase-admin';
import { UserService } from 'src/User/services/user.service';
import { UpdateUserEmailDto } from '../Dto/update-user-email.request';


@Controller('auth')
export class AuthController {
    constructor(private UserService: UserService){}

    @Post('/login')
    @HttpCode(200)
    async login(@Body() requestBody: Login): Promise<any> {

        let token: string;
        let extractedUserEmail: string;
        
        try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, requestBody.email, requestBody.password);

            const checkUser = await this.UserService.getUser(requestBody.email);

            if(userCredential.user.emailVerified == true && ! checkUser){
                await this.UserService.createUserOnDatabase(requestBody.email);
            } else if( userCredential.user.emailVerified == false){
                throw new Error('You must verify your email!');
            }

            token = await userCredential.user.getIdToken();
            extractedUserEmail = userCredential.user.email;

        } catch (error) {
            if(error == 'Error: You must verify your email!'){
                throw new HttpException(error.toString(), HttpStatus.UNAUTHORIZED);
            }
            if(error.code == 'auth/user-not-found'){
                return '';
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
    async changeEmail(@Query('email') email: UpdateUserEmailDto): Promise<any> { 
        try {
            await sendPasswordResetEmail(firebaseAuth, email.email);
        } catch (error) {
            if(error.code == 'auth/user-not-found'){
                throw new HttpException('', HttpStatus.NO_CONTENT);
            }else {
                throw new HttpException('', HttpStatus.SERVICE_UNAVAILABLE);
            }
        }

        return '';
    }

    @Put('/change-email')
    @UseGuards(FirebaseAuthGuard)
    @HttpCode(204)
    async updateUsername(@Request() req: any, @Body() requestBody: UpdateUserEmailDto): Promise<any> {
        try {
            await this.UserService.updateUserEmail(req.user.uid, requestBody.password, req.user.email, requestBody.email);

            await auth().revokeRefreshTokens(req.user.uid);
        } catch (error) {
            if(error == 'Error: User not found'){
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Server error', HttpStatus.SERVICE_UNAVAILABLE);
        }
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