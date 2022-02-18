import { ApiProperty } from '@nestjs/swagger';

import { BoardHistoryEntity } from 'src/history/infra/entity/BoardHistoryEntity';

export class AllMonthBoardCountResponse {
	@ApiProperty({
		type: 'array',
		description: 'board history data list',
		example: [{ bhl_index: 3, bhl_count: 2, bhl_datetime: '2021-12-04' }],
	})
	board_count: BoardHistoryEntity[];
}
