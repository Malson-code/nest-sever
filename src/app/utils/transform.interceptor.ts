/*
 * @Author: malson
 * @Description:
 */
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { jwtSecret } from '../../config';
import { generateJWT, validJWT } from '../services/jwt.service';
interface Response<T> {
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();
    const resquest = context.switchToHttp().getRequest();
    // 设置最新的token
    this.setToken(resquest, response);
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          code: 'S0000',
          message: 'success',
        };
      }),
    );
  }

  setToken(resquest, response) {
    const { authorization } = resquest.headers;
    if (authorization) {
      try {
        const decoded = validJWT(authorization) as any;
        if (decoded) {
          const { username, _id } = decoded;
          const token = generateJWT({
            username,
            _id,
          });
          response.header('Authorization', 'Bearer ' + token);
          return;
        }
      } catch (err) {}
    }
  }
}
