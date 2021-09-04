import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CoreResponse {
	@Column()
	ok: boolean;

	@IsString()
	@Column()
	error?: string;
}
