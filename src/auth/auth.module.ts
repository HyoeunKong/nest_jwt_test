import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtRefreshTokenStartegy } from './jwt.refreshtoken.strategy';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

//UsersModule에 있는 UsersService를 사용하므로 UsersModule을 임포트
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'My secret Never let outsiders',
      signOptions: {
        expiresIn: '60s',
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshTokenStartegy],
  exports: [AuthService],
})
export class AuthModule {}
