import { Controller, Post, Body } from '@nestjs/common';
import { InputService } from './input.service';

@Controller('input')
export class InputController {
  constructor(private readonly inputService: InputService) {}

  @Post('store-input')
  storeInput(@Body() body: { input: string }) {
    const { input } = body;
    this.inputService.storeInput(input);
    return { message: 'Input stored successfully' };
  }
}