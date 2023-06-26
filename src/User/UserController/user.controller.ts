import { Controller, Body, Query, Get, Post, HttpException, HttpStatus, Put, UseGuards, Delete, HttpCode } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserRequestDto } from "../Dtos/create-users.request";
import { FirebaseAuthGuard } from "src/auth/firebase/firebase-auth.guard";

@Controller('user')
export class UserController {
    constructor(private UserService: UserService){}

    @Get('/')
    @UseGuards(FirebaseAuthGuard)
    async getUserByUsername(@Query('username') username: string): Promise<any> {
        try {
            return await this.UserService.getUser(username);
        } catch (error) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    @Post('/')
    async createUser(@Body() user: CreateUserRequestDto): Promise<any> {
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
    async updateUser(@Query('userId') userId: string, @Query('column') column: string, @Query('value') value:string): Promise<any> {
        try {
            return await this.UserService.updateUser(userId, column, value);
        } catch (error) {
            if(error == 'Error: User not found'){
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Server error', HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    @Delete('/')
    @HttpCode(204)
    @UseGuards(FirebaseAuthGuard)
    async deleteUser(@Query('userId') userId: string){
        try {
            return await this.UserService.deleteUser(userId);
        } catch (error) {
            throw new HttpException('Server error', HttpStatus.SERVICE_UNAVAILABLE);
        }
    }
}