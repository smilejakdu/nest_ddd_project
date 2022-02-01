import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

interface JwtPayload {
	user_idx: number;
	nickname: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: 'ash_jwt',
		});
	}

	async validate(payload: JwtPayload) {
		const { nickname, user_idx } = payload;
		const user = await this.authService.validateUser(nickname);
		if (!user.ok) {
			return null;
		}
		return {
			user_idx: user.user_idx,
			nickname: user.nickname,
		};
	}
}
