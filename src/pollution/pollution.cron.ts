import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PollutionRepository } from './pollution.repository';

@Injectable()
export class PollutionCron {
  constructor(
    private httpService: HttpService,
    private readonly repository: PollutionRepository,
    private configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    if (this.configService.get<string>('NODE_ENV') !== 'test') {
      console.log('💾  CRON JOB executed');
      this.httpService
        .get(
          `${process.env.IQAIR_API_URL}?lat=48.856613&lon=2.352222&key=${process.env.IQAIR_API_KEY}`,
        )
        .subscribe((response) => {
          const pollution = response.data.data.current.pollution;
          this.repository.create(pollution);
        });
    }
  }
}
