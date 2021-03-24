import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

/**
 * The API controller serving the home route for the backend.
 */
@Controller('')
export class ApiController {
    @ApiResponse({ status: HttpStatus.OK, description: 'Welcome to the HelloTangle API!' })
    @Get('')
    @HttpCode(HttpStatus.OK)
    public async getHome(): Promise<string> {
        return 'Welcome to the HelloTangle API!';
    }
}
