import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
// UsersService를 export 하면 다른 모듈 에서도 쓸 수 있음

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
