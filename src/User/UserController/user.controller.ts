import { Controller, Body, Query, Get, Post, HttpException, HttpStatus, Put, UseGuards, Delete, HttpCode, Headers, Request } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserRequestDto } from "../Dtos/create-users.request";
import { FirebaseAuthGuard } from "src/auth/firebase/firebase-auth.guard";
import { auth } from 'firebase-admin';

@Controller('user')
export class UserController {
    constructor(private UserService: UserService){}

    @Get('/')
    @UseGuards(FirebaseAuthGuard)
    async getUser(@Request() req: any ): Promise<any> {
        try {
            return await this.UserService.getUser(req.user.email);
        } catch (error) {
            throw new HttpException('Server error' + error, HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Post('/')
    async createUser(@Body() user: CreateUserRequestDto): Promise<any> {

        if(!(user.email || user.password || user.username)){
            throw new HttpException('username , email and password are required!', HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.UserService.createUser(user);

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

    @Put('/')
    @UseGuards(FirebaseAuthGuard)
    async updateUser(@Request() req: any, @Query('column') column: string, @Query('value') value:string): Promise<any> {
        if(!(column || value)){
            throw new HttpException('column and value are required!', HttpStatus.BAD_REQUEST);
        }

        try {
            return await this.UserService.updateUser(req.user.email, column, value);
        } catch (error) {
            if(error == 'Error: User not found'){
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Server error', HttpStatus.SERVICE_UNAVAILABLE);
        }

        return 'ok';
    }

    @Delete('/')
    @HttpCode(204)
    @UseGuards(FirebaseAuthGuard)
    async deleteUser(@Request() req: any){
        try {
            return await this.UserService.deleteUser(req.user.uid, req.user.email);
        } catch (error) {
            throw new HttpException('Server error', HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}