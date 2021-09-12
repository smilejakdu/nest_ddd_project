import { log } from 'console';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest();
	log('decorator request', request.user);
	return request.user;
});
