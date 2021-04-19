import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /** 查询所有信息  暂时先不要分页 */
  @Get('users')
  async findAll(): Promise<any> {
    const { users, pages } = await this.userService.findAll({
      page: 1,
      size: 10,
    });
    return {
      users,
      ...pages,
    };
  }

  /** 查询单个 */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new BadRequestException('参数错误！');
    }
    return user;
  }

  /** 新增 */
  @Post()
  async addOne(@Body() user: IUser): Promise<any> {
    await this.userService.addOne(user);
    return user;
  }

  /** 修改 */
  @Put(':id')
  async editOne(@Param('id') id: string, @Body() body: IUser): Promise<any> {
    await this.userService.editOne(id, body).catch(() => {
      throw new BadRequestException('Params is error!');
    });
    return body;
  }

  /**删除 */
  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<any> {
    await this.userService.deleteOne(id).catch(() => null);
    return null;
  }
}
