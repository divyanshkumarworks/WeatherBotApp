import { Module } from '@nestjs/common';
import { UserManagementModule } from '../user_management/user_management.module';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { BotSettings, BotSettingsSchema } from './schemas/bot-settings.schema'
import { MongooseModule } from '@nestjs/mongoose' 

@Module({
  imports: [UserManagementModule, MongooseModule.forFeature([{ name: BotSettings.name, schema: BotSettingsSchema }])],
  providers: [TelegramService],
  controllers: [TelegramController],
})
export class TelegramModule {}
