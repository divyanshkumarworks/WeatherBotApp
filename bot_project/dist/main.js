"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    await app.listen(4000);
    app.use(session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
    }));
}
bootstrap();
//# sourceMappingURL=main.js.map