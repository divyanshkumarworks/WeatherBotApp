import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MessageCronService } from './message_cron.service';
import { UserManagementModule } from '../user_management/user_management.module';

@Module({
  imports: [ScheduleModule.forRoot(), UserManagementModule],
  providers: [MessageCronService]
})
export class MessageCronModule {}
