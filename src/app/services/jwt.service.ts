/*
 * @Author: malson
 * @Description:jwt 处理
 */

import { jwtSecret, jwtSecretexpiresIn } from '../../config';
import { sign, verify } from 'jsonwebtoken';

/** 生成jwt */
interface IjwtPayload {
  username: string;
  _id: string;
}
export function generateJWT(payload: IjwtPayload) {
  console.log('');
  const token = sign(payload, jwtSecret, {
    expiresIn: jwtSecretexpiresIn, //有效时间 60 分钟
  });
  return token;
}

/**校验jwt */
export function validJWT(Bearertoken) {
  try {
    const token = Bearertoken.trim().split(' ')[1];
    const decoded = verify(token, jwtSecret);
    if (decoded) {
      return decoded;
    }
  } catch (err) {
    return null;
  }
  return null;
}
