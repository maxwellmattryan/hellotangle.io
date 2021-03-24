import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as compression from 'compression';
import * as helmet from 'helmet';

import { ApiModule } from '@api/api.module';

import { ExtendedLogger } from '@api/utils/extended-logger';

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

    app.useGlobalPipes(new ValidationPipe());

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
}

bootstrap();
