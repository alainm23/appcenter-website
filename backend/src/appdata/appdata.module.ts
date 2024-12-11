import { Module } from '@nestjs/common';
import { AppdataService } from './appdata.service';
import { AppdataController } from './appdata.controller';

@Module({
  controllers: [AppdataController],
  providers: [AppdataService],
})
export class AppdataModule {}
