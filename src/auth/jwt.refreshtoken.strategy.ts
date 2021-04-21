import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtRefreshTokenStartegy extends PassportStrategy(
  Strategy,
  'jwt-refreshtoken',
) {
  constructor(private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('accessToken'),
      ignoreExpiration: true,
      secretOrKey: 'My secret Never let outsiders',
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any) {
    console.log('!!!!!!!!!!!');
    const user = await this.userService.findOne(payload.username);
    console.log(payload.sub, 'user');
    if (!user) {
      throw new UnauthorizedException();
    }
    if (req.body.refreshToken !== user.refreshtoken) {
      throw new UnauthorizedException();
    }
    if (new Date() > new Date(user.refreshtokenexpires)) {
      throw new UnauthorizedException();
    }

    console.log(payload.sub, payload.username, ',user');
    return { userId: payload.sub, username: payload.username };
  }
}
