import {
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}