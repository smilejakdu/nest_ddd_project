import { Inject, Injectable } from '@nestjs/common';

import { IUseCase } from '../../../shared/core/IUseCase';
import { FindUserRequest, FindUserResponse } from './dto/FindUseCase.dto';
import { IUserRepository } from '../../infra/IUserRepository';
import {BadRequestResponse, SuccessFulResponse} from "../../../shared/core/core.response.dto";

@Injectable()
export class FindUserUseCase implements IUseCase<FindUserRequest, FindUserResponse> {
	private HAS_NOT_USER = 'Can`t found User.';

	constructor(
		@Inject('USER_REPOSITORY')
		private readonly userRepository: IUserRepository,
	) {}

	async execute(request: FindUserRequest): Promise<FindUserResponse> {
		try {
			const requestNickname = request.nickname;
			const foundUser = await this.userRepository.findUserByNickname(requestNickname);

			if (!foundUser) {
				return BadRequestResponse(this.HAS_NOT_USER);
			}

			return SuccessFulResponse(
				 {
					user_idx: foundUser.user_idx,
					nickname: foundUser.nickname.toString(),
					boards: foundUser.Boards,
					comments: foundUser.Comments,
				}
			);
		} catch (error) {
			return BadRequestResponse(error.message);
		}
	}
}
