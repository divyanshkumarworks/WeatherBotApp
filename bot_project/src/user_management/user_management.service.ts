import { Injectable,  NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserManagementService {
	constructor(
		@InjectModel(User.name)
		private userModel: mongoose.Model<User>
	) {}

	async findAll(): Promise<User[]> {
		const users = await this.userModel.find();
		return users;
	}	

	async findOne(
		id: string,
	  ): Promise<User[]> {
	  	const users = await this.userModel.find({user_id: id});
	  	return users
	}

	async deleteUser(
		id: string,
		): Promise<User | null> {
		return this.userModel.findByIdAndDelete(id).exec();
	}

	async saveUser(
	    user_id: string,
	    first_name: string,
	    last_name: string,
	    location: string,
	    latitude: string,
	    longitude: string,
	    is_block: boolean,
	  ): Promise<User> {
	    const user = new this.userModel({
	      user_id,
	      first_name,
	      last_name,
	      location,
	      latitude,
	      longitude,
	      is_block,
	    });
	    return await user.save();
	  }

  	async toggleBlock(id: string): Promise<User> {
	    const user = await this.userModel.findById(id);
	    if (!user) {
	      throw new NotFoundException('User not found');
	    }

	    user.is_block = !user.is_block;
	    return user.save();
    }
}