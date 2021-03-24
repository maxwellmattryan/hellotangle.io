import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as compression from 'compression';
import * as helmet from 'helmet';

import { ExtendedLogger } from '@api/utils/extended-logger';
import { HttpRequestLogger } from '@api/core/http/http-request.logger';
import { HttpExceptionLogger } from '@api/core/http/http-exception.logger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(ApiModule);
    app.useLogger(app.get(ExtendedLogger));

    app.enableCors({
        origin: true,
        methods: 'GET,POST,PUT,DELETE,BATCH,OPTIONS',
        credentials: true
    });

    app.setGlobalPrefix('api');

    app.use(compression());
    app.use(helmet());

    app.useGlobalFilters(new HttpExceptionLogger());
    app.useGlobalInterceptors(new HttpRequestLogger());

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
}

bootstrap();
