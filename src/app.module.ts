import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GarbageCollectionModule } from './garbagePickupModule/garbageCollection.module';

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
    GarbageCollectionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
