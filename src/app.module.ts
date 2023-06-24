import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WaterContractsModule } from './WaterContractsModule/waterContracts.module';
import { WaterReadingsModule } from './WaterReadingsModule/waterReadings.module';
import { EventsModule } from './EventsModule/events.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27018,
      database: 'ambigestDb',
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
    }),
    WaterContractsModule,
    WaterReadingsModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
