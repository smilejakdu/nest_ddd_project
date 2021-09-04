import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CoreEntity } from 'src/shared/entity/Core.entity';

@Index('nickname', ['nickname'], { unique: true })
@Entity({ schema: 'ddd_watcha', name: 'users' })
export class Users extends CoreEntity {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'ash',
    description: 'nickname',
  })
  @Column('varchar', { name: 'nickname', length: 80 })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @Column('varchar', { name: 'password', length: 150, select: false }) // select: false 하면 password 빼고 불러온다.
  password: string;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
