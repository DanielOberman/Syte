import { Body, Controller, Get, Post, Res, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { AuthGuard } from '../guards/authGuard';

@Controller('user')
export class UserController {
    constructor(private readonly UserService: UserService, private jwtService: JwtService) {}

    /**
     * Register Endpoint
     *
     * This endpoint is used to register a new user.
     * The endpoint accepts a POST request with email and password in the request body.
     *
     * @url user/register
     * @method POST
     * @param {string} email - The user's email
     * @param {string} password - The user's password
     * @return {Object} - The user data of the newly registered user
     * @throws {BadRequestException} - If the email is already registered
     */
    @Post('register')
    async register(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        const user = await this.UserService.register({ email, password });

        if (user) {
            const jwt = await this.jwtService.signAsync({ id: user.id });

            response.cookie('jwt', jwt, { httpOnly: true });
        }

        return user;
    }

    /**
     * Login Endpoint
     *
     * This endpoint is used to authenticate a user and generate a JWT cookie.
     * The endpoint accepts a POST request with email and password in the request body.
     *
     * @url user/login
     * @method POST
     * @param {string} email - The user's email
     * @param {string} password - The user's password
     * @param {Response} response - The response object
     * @return {Object} - The user data of the authenticated user
     * @throws {UnauthorizedException} - If the user is not authenticated
     */
    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        const user = await this.UserService.login({ email, password });

        if (user) {
            const jwt = await this.jwtService.signAsync({ id: user.id });

            response.cookie('jwt', jwt, { httpOnly: true });
        }

        return user;
    }

    /**
     * User Endpoint
     *
     * This endpoint returns the user data of the authenticated user.
     * The endpoint accepts a GET request with a JWT cookie in the request header.
     *
     * @url user
     * @method GET
     * @param {Request} request - The request object
     * @return {Object} - The user data of the authenticated user
     * @throws {UnauthorizedException} - If the user is not authenticated
     */
    @Get()
    @UseGuards(AuthGuard)
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];
            const decoded = await this.jwtService.verifyAsync(cookie);

            if (!decoded) throw new UnauthorizedException();

            const user = await this.UserService.findOne(decoded.id as string);
            return user;
        } catch (err) {
            throw new UnauthorizedException();
        }
    }

    /**
     * Logout Endpoint
     *
     * This endpoint is used to log out a user by clearing their JWT cookie.
     * The endpoint accepts a POST request and returns a success message in the response body.
     *
     * @url user/logout
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
