## Passport Library
- Passport는 가장 유명한 node.js authentication library 이다.
- Passport에는 Stratgy가 포함됨 (user credential을 읽고, 유효한 사용자를 확인하기위해 validation() 메서드를 호출하여 유효성을 검사하는데 사용됨) 
- 성공적으로 사용자를 검사하고, Passport는 request에 사용자 정보를 붙임

### passport-local 
- Passport 전략중 하나
- username 및 password를 사용해서 사용자 인증
- 변수동일해야함 아니면 PassportStrategy가 값을 읽을 수 없음
- 사용자 지정페이로드 변수이름을 사용하려면 'usernameField', 'passwordField' 옵션을 사용하여
로컬 PassportStrategy 구성시 해당이름을 지정해야함

passport-local 패키지 설치
```bash
npm install-@ nestjs / passport passport passport-local 저장
npm install --save-dev @ types / passport-local
```

## JWT
- 사용자를 인증하기 위해 액세스 토큰 생성
- 사용자 정보를 포함하는 암호화된 문자열

```bash
npm install --save @nestjs/jwt
```

src/auth/auth.module.ts

```typescript
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import {JwtModule} from '@nestjs/jwt';
 
@Module({
  imports: [UsersModule, PassportModule,
  JwtModule.register({
    secret: "My Secret Never let outsiders",
    signOptions:{
      expiresIn: '60s'
    }
  })],
  providers: [AuthService, LocalStrategy],
  exports:[AuthService]
})
export class AuthModule {}
```

secret:JWT 토큰을 암호화 하기위한 값, 실제 서비스에서는 하드코딩금지
expiresIn: 토큰의 만료 시간