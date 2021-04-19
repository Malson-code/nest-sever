import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [UserModule],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
