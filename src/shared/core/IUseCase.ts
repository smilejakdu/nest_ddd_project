export interface IUseCase<IRequest, IResponse> {
	execute(request?: IRequest, userId?: number): Promise<IResponse> | IResponse;
}
