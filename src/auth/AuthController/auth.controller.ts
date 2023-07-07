import { Body, Controller, HttpCode, Post, UseGuards, HttpException, HttpStatus, Headers, Put, Request } from '@nestjs/common';
import { signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth";
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import firebaseAuth from "src/auth/firebase/firebaseInit";
import { Login } from '../Dto/login.request';
import { auth } from 'firebase-admin';
import { UserService } from 'src/User/services/user.service';
import { UpdateUserEmailDto } from '../Dto/update-user-email.request';
import { RecoverUserPasswordDto } from '../Dto/recover-password.request';

@Controller('auth')
export class AuthController {
    constructor(private UserService: UserService){}

    @Post('/login')
    @HttpCode(200)
    async login(@Body() requestBody: Login): Promise<any> {
        let token: string;

        try {
            const userCredential = await signInWithEmailAndPassword(firebaseAuth, requestBody.email, requestBody.password);
            const checkUser = await this.UserService.getUserByFirebaseId(userCredential.user.uid);

            // Case when its first user login after register
            if(userCredential.user.emailVerified == true && ! checkUser){
                await this.UserService.createUserOnDatabase(userCredential.user.uid, requestBody.email);
            
            // Case when user is registered on firebase isn't verify the email
            } else if( userCredential.user.emailVerified == false){
                throw new Error('You must verify your email!');
            
            // Case when user update the email, this case occurs only after email verification, then update on database.
            } else if(userCredential.user.emailVerified == true && checkUser && checkUser.email != userCredential.user.email){
                await this.UserService.updateUserEmail(checkUser._id, userCredential.user.email);
            }

            token = await userCredential.user.getIdToken();

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
        };
          
        return JSON.stringify(data);
    }

    @Post('/recover-password')
    @HttpCode(204)
    async changeEmail(@Body() requestBody: RecoverUserPasswordDto): Promise<any> { 
        try {
            await sendPasswordResetEmail(firebaseAuth, requestBody.email);
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
    async updateEmail(@Request() req: any, @Body() requestBody: UpdateUserEmailDto): Promise<any> {
        
        if(req.user.email == requestBody.email){
            throw new HttpException('The email address must be different than the current one' , HttpStatus.BAD_REQUEST);
        }

        try{
            await this.UserService.updateUserEmailFirebase(requestBody.password, req.user.email, requestBody.email);
        } catch (error) {
            if(error == 'Error: User not found'){
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            if(error == 'Error: The email address is already in use by another account.'){
                throw new HttpException('The email address is already in use by another account.' , HttpStatus.BAD_REQUEST);
            }

            if(error == 'FirebaseError: Firebase: Error (auth/wrong-password).'){
                throw new HttpException('Wrong password' , HttpStatus.BAD_REQUEST);
            }

            throw new HttpException('Error: ' + error , HttpStatus.INTERNAL_SERVER_ERROR);
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