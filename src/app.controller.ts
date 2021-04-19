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
      userName: req.user.username,
    });
    // 1.return await this.authService.validateUser('naveen', '1234');
    //2. return req.user;
  }
}
