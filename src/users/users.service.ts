//users의 데이터에 대한 로직 컨테이너
//Injectable : 주입이 가능한 서비스로 만듦

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOne(userName: string): Promise<User | undefined> {
    return this.userRepo.findOne({ userName });
  }

  async saveorupdateRefreshToken(
    refreshToken: string,
    id: string,
    refreshtokenexpires,
  ) {
    console.log(id, 'id');
    await this.userRepo.update(id, {
      refreshtoken: refreshToken,
      refreshtokenexpires,
    });
  }
}
