import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as randtoken from 'rand-token';
// UsersService를 AuthService 에 주입함
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(userName);
    if (user && user.password === pass) {
      const result = {
        id: user.id,
        userName: user.userName,
      };
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.userName, sub: user.userId };

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: await this.generateRefreshToken(user.userId),
    };
  }

  async generateRefreshToken(userId): Promise<string> {
    const refreshToken = randtoken.generate(16);
    const expirydate = new Date();
    expirydate.setDate(expirydate.getDate() + 6);
    console.log({ expirydate });
    await this.usersService.saveorupdateRefreshToken(
      refreshToken,
      userId,
      expirydate,
    );
    return refreshToken;
  }
}
