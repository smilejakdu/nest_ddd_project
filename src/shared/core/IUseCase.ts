export interface IUseCase<IRequest, IResponse> {
	execute(request?: IRequest, userId?: string): Promise<IResponse> | IResponse;
}
