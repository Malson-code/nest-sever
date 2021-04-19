/*
 * @Author: malson
 * @Description:用户模块
 */
import * as mongoose from 'mongoose';
import { schemaOptions } from '../config';
// 对应的就是表名  不分大小写
export const UserSchemaName = 'users';
// 对应的就是表字段的集合，以及在插入数据的时候数据格式校验，如果数据格式不对的话直接 500
export const UserSchema = new mongoose.Schema(
  {
    name: String,
    age: { type: String, required: [true, 'Logs：没有传入age'] },
    sex: String,
    password: String,
  },
  schemaOptions,
);
