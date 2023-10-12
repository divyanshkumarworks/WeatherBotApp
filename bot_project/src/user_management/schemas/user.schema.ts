import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'


@Schema ({
	timestamps: true
})
export class User {

	@Prop({required: true})
	user_id: string;

	@Prop({required: true})
	first_name: string;

	@Prop()
	last_name: string;

	@Prop({required: true})
	location: string;

	@Prop({required: true})
	latitude: string;

	@Prop({required: true})
	longitude: string;

	@Prop({default: false})
	is_block: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);