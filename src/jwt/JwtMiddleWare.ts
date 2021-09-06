import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

import { JwtService } from './JwtService';
import { FindUserUseCase } from 'src/user/application/FindUser/FindUserUseCase';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
	constructor(
		private readonly jwtService: JwtService,
		private readonly findUserUseCase: FindUserUseCase,
	) {}

	async use(req: Request, res: Response, next: NextFunction) {
		if ('x-jwt' in req.headers) {
			const token = req.headers['x-jwt'];

			const decoded = this.jwtService.verify(token.toString());
			if (typeof decoded === 'object' && decoded.hasOwnProperty('nickname')) {
				try {
					const { user } = await this.findUserUseCase.execute({
						nickname: decoded['nickname'],
					});

					req['user'] = user;
				} catch (error) {}
			}
		}

		next();
	}
}
