import { Controller, Post, Body, Get } from '@nestjs/common';
import { TelegramService } from './telegram.service'
import { BotSettings } from './schemas/bot-settings.schema'

@Controller('api')
export class TelegramController {
  constructor(private telegramService: TelegramService) {}

  @Get('get-api-key')
  async getAllUsers(): Promise<string> {
    return this.telegramService.getApiKey();
  }

  @Post('update-api-key')
  async updateApiKey(@Body() data: { newApiKey: string }) {
    // calling the updateToken function to update Telegram Token with the new API key
    await this.telegramService.updateToken(data.newApiKey);
  }

}