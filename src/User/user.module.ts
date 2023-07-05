import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { UserService } from './services/user.service';
import { UserRepository } from './repository/user.repository';
import { UserController } from './UserController/user.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity])
    ],
    providers: [
        UserService,
        UserRepository
    ],
    controllers: [
        UserController
    ],
    exports:[
        UserService,
        UserRepository
    ]
})
export class UserModule{}
