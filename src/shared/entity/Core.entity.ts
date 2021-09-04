import { ApiProperty } from '@nestjs/swagger';
import {
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Index('id', ['id'], { unique: true })
export class CoreEntity {
  @ApiProperty({
    example: 'id',
  })
  @PrimaryColumn({ type: 'int', name: 'id' })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
