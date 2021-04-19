import { IsString } from 'class-validator';
export class ILogin {
  @IsString()
  username: string;

  @IsString()
  password: number;
}
