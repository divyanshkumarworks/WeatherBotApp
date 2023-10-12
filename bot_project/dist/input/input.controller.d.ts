import { InputService } from './input.service';
export declare class InputController {
    private readonly inputService;
    constructor(inputService: InputService);
    storeInput(body: {
        input: string;
    }): {
        message: string;
    };
}
