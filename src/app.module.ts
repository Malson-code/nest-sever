import { LogModule } from './app/modules/log/log.module';
import { UserModule } from './app/modules/user/user.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './app/utils/permission';
import { mongodbURL } from './config';
@Module({
  imports: [MongooseModule.forRoot(mongodbURL), UserModule, LogModule],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply();
  }
}
