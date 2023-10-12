import { Body, Controller, Get, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { UserManagementService } from './user_management.service'

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
	    await this.userManagementService.deleteUser(id.toString());
	  }


  	@Patch(':id/toggleBlock')
	  async toggleBlock(@Param('id') id: string): Promise<User> {
	    return this.userManagementService.toggleBlock(id);
	  }

}