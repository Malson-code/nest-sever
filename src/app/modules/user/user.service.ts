import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IPages } from '../../interfaces/public.interface';
import { getCountAndData } from '../../utils/utils';
import { UserSchemaName } from '../../../schemas/user.schems';
import { IUser } from './user.interface';
@Injectable()
export class UserService {
  constructor(@InjectModel(UserSchemaName) private userModal: any) {}

  /** 具体Mongo modal方法查看 http://www.mongoosejs.net/docs/api.html#mongoose_Mongoose-mongo */
  // 查找所有用户
  async findAll(params): Promise<any> {
    const { page, size } = params;
    const result = await this.userModal.aggregate([
      // 关联查询
      {
        $lookup: {
          from: 'roles', // 目标库
          localField: 'roles', // 当前库的哪个字段去关联查询
          foreignField: '_id', // 查询目标库的哪个字段
          as: 'roles', // 查询完了 在数据中显示的 Key
        },
      },
      getCountAndData(page, size),
    ]);
    const { total, data } = result[0];
    const pages: IPages = {
      total: total[0]?.count || 0,
      page,
      size,
    };
    return { users: data, pages };
  }

  // 查找单个用户
  async findOne(_id: string): Promise<IUser> {
    const res = await this.userModal.findById(_id).catch(() => null);
    return res;
  }

  // 查找单个用户
  async findOneByName(name: string): Promise<IUser> {
    const res = await this.userModal.find({
      name,
    });
    return res;
  }

  // 添加单个用户
  async addOne(body: any): Promise<void> {
    await this.userModal.create(body);
  }

  // 编辑单个用户
  async editOne(_id: string, body: any): Promise<void> {
    await this.userModal.findByIdAndUpdate(_id, body);
  }

  // 删除单个用户
  async deleteOne(_id: string): Promise<void> {
    await this.userModal.findByIdAndDelete(_id);
  }
}
