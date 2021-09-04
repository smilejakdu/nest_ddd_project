import { CustomError } from 'ts-custom-error';
// npm i ts-custom-error
interface IUseCseError {
	message: string;
}

export abstract class UseCaseError
	extends CustomError
	implements IUseCseError {}
