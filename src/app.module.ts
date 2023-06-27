import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/AuthController/auth.controller';
import { FirebaseAuthStrategy } from './auth/firebase/firebase-auth.strategy';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './User/user.module';
import { AuthModule } from './auth/auth.module';
import { WaterContractsModule } from './WaterContracts/waterContracts.module';
import { WaterReadingsModule } from './WaterReadingsModule/waterReadings.module';
import { EventsModule } from './EventsModule/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env['MONGO_URL'],
      useNewUrlParser: true,
      useUnifiedTopology: true,
      database: process.env['MONGO_DB'],
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
    WaterContractsModule,
    WaterReadingsModule,
    EventsModule
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}
