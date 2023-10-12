import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { InputModule } from './input/input.module';
import { UserManagementModule } from './user_management/user_management.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageCronModule } from './message_cron/message_cron.module';
import { AuthUtilsModule } from './auth-utils/auth-utils.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { SessionSerializer } from './auth-utils/session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TelegramModule, 
    InputModule, 
    PassportModule.register({ session: true }),
    UserManagementModule,
    MongooseModule.forRoot('mongodb+srv://johnybravo2404:%40bcd1234@cluster0.ikxf9ss.mongodb.net/nestjs-demo?retryWrites=true&w=majority'),
    MessageCronModule,
    AuthUtilsModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AuthService, AppService, SessionSerializer],
})
export class AppModule {}