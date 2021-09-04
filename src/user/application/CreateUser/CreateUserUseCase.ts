import { Inject } from '@nestjs/common';

import { IUseCase } from '../../../shared/core/IUseCase';
import { UserName } from '../../domain/UserName';
import { User } from '../../domain/User';
import { IUserRepository } from '../../infra/interface/IUserRepository';
import { CreateUserRequest, CreateUserResponse } from './dto/CreateUser.dto';
import { UserEmail } from '../../domain/UserEmail';

export class CreateUserUseCase
  implements IUseCase<CreateUserRequest, CreateUserResponse> {
  private DUPLICATE_EMAIL_ERROR_MESSAGE = 'Request email was duplicated.';

  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const requestEmail = request.email;

    const userNameOrError = UserName.create(request.name);
    const userEmailOrError = UserEmail.create(requestEmail);
    const userPasswordOrError = UserEmail.create(request.password);

    const foundUser = await this.userRepository.findByEmail(requestEmail);

    if (foundUser) {
      return {
        ok: false,
        error: this.DUPLICATE_EMAIL_ERROR_MESSAGE,
      };
    }

    const user = User.createNew({
      userName: userNameOrError.value,
      userEmail: userEmailOrError.value,
      userPassword: userPasswordOrError.value,
    }).value;

    await this.userRepository.save(user);

    return {
      ok: true,
      user: {
        id: user.id.toValue().toString(),
        email: user.email.value,
        name: user.name.value,
      },
    };
  }
}
