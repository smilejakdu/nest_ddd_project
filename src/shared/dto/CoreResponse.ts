import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CoreResponse {
	@Column()
	ok: boolean;

	@IsString()
	@Column()
	error?: string;
}
