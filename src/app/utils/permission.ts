/*
 * @Author: malson
 * @Description: 路由 权限校验
 */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { reqWhiteURLs } from '../../config';
import { validJWT } from '../services/jwt.service';

export const validateRequest = (request, res): boolean => {
  const headers = request.headers;
  const { authorization } = headers;
  const reqRoutePath = request.route.path;
  // 不在请求白名单内进行 token校验
  if (!reqWhiteURLs.includes(reqRoutePath)) {
    // 进行authorization校验
    if (!authorization) {
      throw new UnauthorizedException('您无权访问！');
    }
    const decoded = validJWT(authorization);
    if (!decoded) {
      throw new UnauthorizedException('登录过期，请重新登录！');
    }
  }
  return true;
};

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    return validateRequest(request, response);
  }
}
