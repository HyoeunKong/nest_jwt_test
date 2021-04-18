import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

// UsersService를 AuthService 에 주입함
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
