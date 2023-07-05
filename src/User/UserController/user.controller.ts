import { Controller, Body, Query, Get, Post, HttpException, HttpStatus, Put, UseGuards, Delete, HttpCode, Request } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserRequestDto } from "../Dtos/create-users.request";
import { FirebaseAuthGuard } from "src/auth/firebase/firebase-auth.guard";

@Controller('user')
export class UserController {
    constructor(private UserService: UserService){}

    @Get('/me')
    @UseGuards(FirebaseAuthGuard)
    async getUser(@Request() req: any ): Promise<any> {
        try {
            const user = await this.UserService.getUser(req.user.email);

            return user.username;
        } catch (error) {
            throw new HttpException('Server error' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Post('/')
    async createUser(@Body() user: CreateUserRequestDto): Promise<any> {
        try {
            return await this.UserService.createUserOnFirebase(user);

        } catch (error) {
            if(error == 'FirebaseError: Firebase: Error (auth/email-already-in-use).'){
                throw new HttpException(error.customData._tokenResponse.error.message, HttpStatus.BAD_REQUEST);
            }

            if(error == 'Error: Username already exists'){
                throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
            }

            throw new HttpException('Server error: ' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Put('/username')
    @UseGuards(FirebaseAuthGuard)
    async updateUsername(@Request() req: any, @Query('username') username: string): Promise<any> {
        if(!(username)){
            throw new HttpException('Username is required!', HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.UserService.updateUsername(req.user.email, username);
        } catch (error) {
            if(error == 'Error: User not found'){
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Server error', HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Delete('/me')
    @HttpCode(204)
    @UseGuards(FirebaseAuthGuard)
    async deleteUser(@Request() req: any){
        try {
            await this.UserService.deleteUser(req.user.uid, req.user.email);
        } catch (error) {
            throw new HttpException('Server error' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}