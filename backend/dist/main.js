"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const compression = require("compression");
const express_rate_limit_1 = require("express-rate-limit");
const nest_winston_1 = require("nest-winston");
const winston_config_1 = require("./config/winston.config");
async function bootstrap() {
    const logger = nest_winston_1.WinstonModule.createLogger(winston_config_1.winstonConfig);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { logger });
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
    }));
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Authentication API')
        .setDescription('API for user authentication')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3001);
    logger.log('Application is running on: http://localhost:3001');
}
bootstrap();
//# sourceMappingURL=main.js.map