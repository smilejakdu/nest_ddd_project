import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { log } from 'console';
import dotenv from 'dotenv';

dotenv.config();
const JWT = process.env.JWT;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: JWT,
		});
	}

	async validate(payload: any) {
		log('jwt.strategy payload : ', payload);
		return { id: payload.id, nickname: payload.nickname };
	}
}
