import { IsNumber } from 'class-validator';
import { IsAlphanumeriOrSymbols } from '../../utils/validates';
//    @Length(10, 20)
//    @MinLength(10)
//    @MaxLength(20)
//    @Contains('hello')
//    @Min(0)
//    @Max(10)
//    @IsEmail()
//    @IsDate()
export class IUser {
  @IsAlphanumeriOrSymbols({
    message: '不能输入特殊字符',
  })
  name: string;

  // @IsOptional() // 可选参数，传了就校验，不传就拉到
  @IsNumber()
  age: number;

  password: string;
}
