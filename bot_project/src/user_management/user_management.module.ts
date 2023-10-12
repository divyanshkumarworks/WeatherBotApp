import { Module } from '@nestjs/common';
import { UserManagementController } from './user_management.controller';
import { MongooseModule } from '@nestjs/mongoose' 
import { UserManagementService } from './user_management.service';
import { User, UserSchema } from './schemas/user.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserManagementController],
  providers: [UserManagementService],
  exports: [UserManagementService],
})
export class UserManagementModule {}
