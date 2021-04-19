//users의 데이터에 대한 로직 컨테이너
//Injectable : 주입이 가능한 서비스로 만듦

import { Injectable } from '@nestjs/common';
import { User } from './users';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        userName: 'naveen',
        password: '1234',
      },
      {
        id: 2,
        userName: 'ramamajee',
        password: '2345',
      },
      {
        id: 3,
        userName: 'gopi',
        password: '3456',
      },
      {
        id: 4,
        userName: 'radf df',
        password: '1232',
      },
    ];
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.userName === username);
  }
}
