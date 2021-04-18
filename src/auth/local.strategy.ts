import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

//LocalStrategy는 PassportStrategy를 상속한다. PassportStrategy는 @nestjs/passport 라이브러리에서 로드된다.
// PassportStrategy는 확장 할 전략 유형을 지정하는데 필요한 확장을 위한 일반 유형 인터페이스이다.
// 여기서 우리는 유형을 'passport-local'에서 로드하는 Strategy로 정의 아여 구현하고있다.
