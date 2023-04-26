import {
    Body,
    Controller,
    Get,
    Post,
    Res,
    Req,
    UnauthorizedException,
    UseGuards,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

import { ClientService } from './client.service';
import { AuthGuard } from '../guards/authGuard';
import { MESSAGE } from '@myworkspace/common';

@Controller('client')
export class ClientController {
    constructor(private readonly clientService: ClientService, private jwtService: JwtService) {}

    /**
     * Register Endpoint
     *
     * This endpoint is used to register a new client.
     * The endpoint accepts a POST request with email and password in the request body.
     *
     * @url client/register
     * @method POST
     * @param {string} email - The client's email
     * @param {string} password - The client's password
     * @return {Object} - The client data of the newly registered client
     * @throws {BadRequestException} - If the email is already registered
     */
    @Post('register')
    async register(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        const client = await this.clientService.register({ email, password });

        if (client) {
            const jwt = await this.jwtService.signAsync({ id: client.id });

            response.cookie('jwt', jwt, { httpOnly: true });
        }

        return client;
    }

    /**
     * Login Endpoint
     *
     * This endpoint is used to authenticate a client and generate a JWT cookie.
     * The endpoint accepts a POST request with email and password in the request body.
     *
     * @url client/login
     * @method POST
     * @param {string} email - The client's email
     * @param {string} password - The client's password
     * @param {Response} response - The response object
     * @return {Object} - The client data of the authenticated client
     * @throws {UnauthorizedException} - If the client is not authenticated
     */
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        const client = await this.clientService.login({ email, password });

        if (client) {
            const jwt = await this.jwtService.signAsync({ id: client.id });

            response.cookie('jwt', jwt, { httpOnly: true });
        }

        return client;
    }

    /**
     * Client Endpoint
     *
     * This endpoint returns the client data of the authenticated client.
     * The endpoint accepts a GET request with a JWT cookie in the request header.
     *
     * @url client
     * @method GET
     * @param {Request} request - The request object
     * @return {Object} - The client data of the authenticated client
     * @throws {UnauthorizedException} - If the client is not authenticated
     */
    @Get()
    @UseGuards(AuthGuard)
    async client(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];
            const decoded = await this.jwtService.verifyAsync(cookie);

            if (!decoded) throw new HttpException(MESSAGE.CLIENT.INVALID_CREDENTIALS, HttpStatus.FORBIDDEN);

            const client = await this.clientService.findOne(decoded.id as string);
            return client;
        } catch (err) {
            throw new UnauthorizedException();
        }
    }

    /**
     * Logout Endpoint
     *
     * This endpoint is used to log out a client by clearing their JWT cookie.
     * The endpoint accepts a POST request and returns a success message in the response body.
     *
     * @url client/logout
     * @method POST
     * @param {Response} response - The response object
     * @return {Object} - A JSON object with a success message
     * @throws {Error} - Internal Server Error
     */
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');

        return { message: 'logout success' };
    }
}
