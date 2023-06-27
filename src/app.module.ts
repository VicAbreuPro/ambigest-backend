import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/AuthController/auth.controller';
import { FirebaseAuthStrategy } from './auth/firebase/firebase-auth.strategy';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User/user.module';
import { AuthModule } from './auth/auth.module';
import { WaterContractsModule } from './WaterContractsModule/waterContracts.module';
import { WaterReadingsModule } from './WaterReadingsModule/waterReadings.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'mongodb',
      port: 27017,
      database: 'ambigestDb',
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    WaterContractsModule,
    WaterReadingsModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}
