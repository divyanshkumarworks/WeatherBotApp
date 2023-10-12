import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { UserManagementService } from './user_management.service'

import { CreateUserDto } from './dto/create-user.dto'
import { User } from './schemas/user.schema'

@Controller('user')
export class UserManagementController {
	constructor(private userManagementService: UserManagementService) {}

	@Get()
	async getAllUsers(): Promise<User[]> {
		return this.userManagementService.findAll();
	}

	@Delete(':id')
	  async deleteUser(@Param('id') id: number): Promise<void> {
	    // Implement the logic to delete a user by ID using your service
	    await this.userManagementService.deleteUser(id.toString());
	  }


	// @Post()
	// async createUser(
	// 	@Body()
	// 	user: CreateUserDto
	// ): Promise<User> {
	// 	return this.userManagementService.create(user);
	// }
}