import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter{
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response =  ctx.getResponse();
    const error = exception.getError() as {status: number, message: string};
    if(Number.isInteger(error.status)){
      return response.status(error.status).json({
        status: error.status,
        message: error.message
      });
    }

    response.status(HttpStatus.BAD_REQUEST).json({
      status: error.status,
      message: 'Something was wrong'
    });
  }
}