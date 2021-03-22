import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestLogger implements NestInterceptor {
    private readonly logger: Logger = new Logger('HttpRequestLogger');

    private readonly typeMap: object = {
        get: 'GET',
        put: 'PUT',
        delete: 'DELETE',
        post: 'POST'
    };

    private readonly httpStatusMap: object = {
        200: 'Ok',
        201: 'Created',
        204: 'No Content',
        302: 'Found',
        304: 'Not Modified',
        400: 'Bad Request',
        401: 'Unauthorized',
        402: 'Payment Required',
        403: 'Forbidden',
        404: 'Not Found',
        429: 'Too Many Requests'
    };

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        let method: string = '';
        Object.keys(req.route.methods).forEach(k => {
            // @ts-ignore
            if(req.route.methods[k]) method = this.typeMap[k];
        });

        const statusCode = res.statusCode;
        // @ts-ignore
        const statusMessage = this.httpStatusMap[statusCode];
        const url = req.originalUrl;
        this.logger.log(`[${statusCode} | ${statusMessage}] ${method} ${url}`);

        return next.handle();
    }
}