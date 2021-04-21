//database 와 통신을 하기 위함, 테이블을 나타내는 사용자 모델

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username' })
  userName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  refreshtoken?: string;

  @Column({ nullable: true })
  refreshtokenexpires?: string;
}
