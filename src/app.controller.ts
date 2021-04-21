import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('todos')
  getTodos() {
    return ['Watch Movie', 'Take Health Test', 'Play Cricket'];
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login({
      userId: req.user.id,
      userName: req.user.userName,
    });
    // 1.return await this.authService.validateUser('naveen', '1234');
    //2. return req.user;
  }

  @UseGuards(AuthGuard('jwt-refreshtoken'))
  @Post('auth/refreshtoken')
  async refreshToken(@Request() req) {
    console.log(req.user);
    return await this.authService.login({
      userId: req.user.userId,
      userName: req.user.username,
    });
  }
}
