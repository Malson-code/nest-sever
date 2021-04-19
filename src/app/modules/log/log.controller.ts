import { Body, Controller, Post, Response } from '@nestjs/common';
import { ILogin } from './log.interface';
import { LogService } from './log.service';
import { generateJWT } from '../../services/jwt.service';
@Controller()
export class LogController {
  constructor(private logService: LogService) {}
  @Post('login')
  async login(@Body() body: ILogin, @Response() res): Promise<any> {
    // 获取Response 后必须有返回
    const { username, password } = body;
    const user = await this.logService.login(username, password);
    const token = generateJWT({ username, _id: user._id });
    res.header('Authorization', 'Bearer ' + token);
    res.json({
      data: user,
      code: 'S0000',
      message: 'success',
    });
  }
}
