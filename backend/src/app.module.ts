import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppdataModule } from './appdata/appdata.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AppdataModule,
    CacheModule.register({
      ttl: 4 * 60 * 60 * 1000,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
