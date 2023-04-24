import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

/**
 * A guard that checks whether a client is authenticated by verifying
 * the presence and validity of a JWT token in their cookies.
 * If a valid token is found, the guard allows access to the
 * requested resource.
 * If no token is found or the token is invalid, the guard
 * denies access to the requested resource.
 */

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = request.cookies['jwt'];

        if (!token) {
            return false;
        }

        try {
            const decoded = await this.jwtService.verifyAsync(token);
            console.log(decoded);

            if (decoded) return true;
        } catch {
            return false;
        }
    }
}
