import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthController } from './auth/AuthController/auth.controller';
import { FirebaseAuthStrategy } from './auth/firebase/firebase-auth.strategy';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, FirebaseAuthStrategy],
})
export class AppModule {}
