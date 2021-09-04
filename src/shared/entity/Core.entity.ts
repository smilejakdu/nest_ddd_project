import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateDateColumn, Entity, Index, PrimaryColumn } from 'typeorm';

@Index('id', ['id'], { unique: true })
export class CoreEntity {
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
