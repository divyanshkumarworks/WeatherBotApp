"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManagementController = void 0;
const common_1 = require("@nestjs/common");
const user_management_service_1 = require("./user_management.service");
let UserManagementController = class UserManagementController {
    constructor(userManagementService) {
        this.userManagementService = userManagementService;
    }
    async getAllUsers() {
        return this.userManagementService.findAll();
    }
    async deleteUser(id) {
        await this.userManagementService.deleteUser(id.toString());
    }
};
exports.UserManagementController = UserManagementController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserManagementController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserManagementController.prototype, "deleteUser", null);
exports.UserManagementController = UserManagementController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_management_service_1.UserManagementService])
], UserManagementController);
//# sourceMappingURL=user_management.controller.js.map