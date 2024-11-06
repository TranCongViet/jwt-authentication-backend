import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; 
        if (!token) {
            throw new UnauthorizedException('Access token required');
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); 
            req['user'] = decoded; 
            next(); 
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
              throw new UnauthorizedException('Token expired');
            } else if (error.name === 'JsonWebTokenError') {
              throw new UnauthorizedException('Invalid token');
            } else {
              throw new UnauthorizedException('Unauthorized');
            }
          }
        }
      }
