import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InputService {
	private storedInput: string[] = [];
	private logger = new Logger(InputService.name)
	storeInput(text: string) {
		this.storedInput.push(text);
		this.logger.debug(text)
	}

	getStoredText() {
		return this.storedInput;
	}
}