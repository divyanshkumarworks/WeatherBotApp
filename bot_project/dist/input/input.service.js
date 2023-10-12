"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var InputService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputService = void 0;
const common_1 = require("@nestjs/common");
let InputService = InputService_1 = class InputService {
    constructor() {
        this.storedInput = [];
        this.logger = new common_1.Logger(InputService_1.name);
    }
    storeInput(text) {
        this.storedInput.push(text);
        this.logger.debug(text);
    }
    getStoredText() {
        return this.storedInput;
    }
};
exports.InputService = InputService;
exports.InputService = InputService = InputService_1 = __decorate([
    (0, common_1.Injectable)()
], InputService);
//# sourceMappingURL=input.service.js.map