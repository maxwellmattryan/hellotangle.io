import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as compression from 'compression';
import * as helmet from 'helmet';

import { ExtendedLogger } from '@api/core/utils/extended-logger';
import { HttpRequestLogger } from '@api/core/http/http-request.logger';
import { HttpExceptionLogger } from '@api/core/http/http-exception.logger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(ApiModule);
    app.useLogger(app.get(ExtendedLogger));

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

    app.useGlobalFilters(new HttpExceptionLogger());
    app.useGlobalInterceptors(new HttpRequestLogger());

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
}

bootstrap();
