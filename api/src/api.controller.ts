import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Routes } from '@api/core/configs/routes.config';

/**
 * The API controller serving the home route for the backend.
 */
@Controller()
export class ApiController {
    @Get(Routes.Api.root)
    @HttpCode(HttpStatus.OK)
    public async getHome(): Promise<{ message: string }> {
        return { message: 'Welcome to the HelloTangle API!' };
    }
}
