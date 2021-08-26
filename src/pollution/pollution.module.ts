import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pollution, PollutionSchema } from './Pollution';
import { PollutionController } from './pollution.controller';
import { PollutionCron } from './pollution.cron';
import { PollutionRepository } from './pollution.repository';
import { PollutionResolver } from './pollution.resolver';
import { PollutionService } from './pollution.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Pollution.name, schema: PollutionSchema },
    ]),
  ],
  controllers: [PollutionController],
  providers: [
    PollutionResolver,
    PollutionService,
    PollutionRepository,
    PollutionCron,
  ],
  exports: [PollutionService],
})
export class PollutionModule {}
