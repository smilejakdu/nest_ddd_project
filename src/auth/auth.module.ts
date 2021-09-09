import { Module }         from '@nestjs/common';
import { TypeOrmModule }  from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule }      from '@nestjs/jwt';

import { AuthService }   from './auth.service';
import { JwtStrategy }   from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserEntity }    from 'src/user/infra/entity/User.entity';
import { UserModule }    from 'src/user/user.module';


const jwt = process.env.JWT as string;

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy ],
  exports  : [AuthService],
})
export class AuthModule {}