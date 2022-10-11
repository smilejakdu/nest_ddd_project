import {HttpStatus} from "@nestjs/common";

export function SuccessFulResponse<T>(
  data?: T,
  message = 'SUCCESS',
  status = HttpStatus.OK,
) {
  if (status === HttpStatus.CREATED) {
    return {
      ok: true,
      message: message,
      statusCode: status,
      data,
    };
  }
  return {
    ok: true,
    statusCode: status,
    message: message,
    data,
  };
}

export function BadRequestResponse<T>(
  message: string,
  status = HttpStatus.BAD_REQUEST,
) {
  return {
    ok: false,
    statusCode: status,
    message,
  };
}
