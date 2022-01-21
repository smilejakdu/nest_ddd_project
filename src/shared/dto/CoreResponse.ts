import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CoreResponse {
	@Column()
	ok: boolean;

	@Column()
	statusCode: number;

	@IsString()
	@Column()
	error?: string;
}
