import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as compression from 'compression';
import * as helmet from 'helmet';

import { HttpRequestLogger } from '@api/core/http/http-request.logger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        logger: ['debug', 'log', 'warn', 'error']
    });

    app.enableCors({
        origin: true,
        methods: 'GET,POST,PUT,DELETE,BATCH,OPTIONS',
        credentials: true
    });

    app.setGlobalPrefix('api');

    app.use(compression());
    app.use(helmet());

    app.useGlobalInterceptors(new HttpRequestLogger());

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
}

bootstrap();
