import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { NestExpressApplication } from '@nestjs/platform-express';

import * as compression from 'compression';
import * as helmet from 'helmet';

import { HttpRequestLogger } from '@api/core/http/http-request.logger';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(ApiModule, {
        logger: ['debug', 'log', 'warn', 'error']
    });

    const config = new DocumentBuilder()
        .setTitle('HelloTangle API')
        .setDescription('The documentation for HelloTangle\'s API')
        .setVersion('0.0.1')
        .addTag('hellotangle')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

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
