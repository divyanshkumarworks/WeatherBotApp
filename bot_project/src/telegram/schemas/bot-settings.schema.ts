import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema ()
export class BotSettings {

	@Prop({required: true})
	botApiKey: string;

}

export const BotSettingsSchema = SchemaFactory.createForClass(BotSettings);