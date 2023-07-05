import { Module } from '@nestjs/common';
import { UserService } from 'src/User/services/user.service';
import { AuthController } from './AuthController/auth.controller';
import { UserModule } from 'src/User/user.module';
import { UserRepository } from 'src/User/repository/user.repository';

@Module({
    imports: [
        UserModule,
    ],
    providers: [
        UserService,
        UserRepository
    ],
    controllers: [
        AuthController
    ]
})
export class AuthModule{}
