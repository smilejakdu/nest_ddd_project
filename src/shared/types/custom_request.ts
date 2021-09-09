import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
	decoded?: JwtPayload | string;
}

export interface AuthRequestHeader extends IncomingHttpHeaders {
	authentication: string;
}
