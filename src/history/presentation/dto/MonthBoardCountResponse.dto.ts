import { ApiProperty } from '@nestjs/swagger';

export class MonthBoardCountResponseDto {
	@ApiProperty({
		type: 'string',
		description: 'this month string',
		example: '2021-12-02',
	})
	this_month: string;

	@ApiProperty({
		type: 'number',
		description: 'this month count',
		example: '3',
	})
	board_count: number;
}
