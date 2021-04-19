import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class LogService {
  constructor(private userService: UserService) {}

  accountOrPswError = '账号或密码不正确！';

  async login(username, psw) {
    const user = await this.userService.findOneByName(username);
    if (!user[0]) {
      throw new BadRequestException(this.accountOrPswError);
    }
    const userObj = user[0].toObject();
    const dbPSW = userObj.password;
    if (psw === dbPSW) {
      const resUser = userObj;
      delete resUser.password;
      return resUser;
    } else {
      throw new BadRequestException(this.accountOrPswError);
    }
  }
}
