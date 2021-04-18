import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  hi() {
    return 'hi';
  }

  @Post('auth/login')
  async login() {
    return await this.authService.validateUser('naveen', '1234');
  }
}
