import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CoreResponse {
	@Column()
	ok: boolean;

	@Column()
	status_code?: number;

	@IsString()
	@Column()
	error?: string;
}
