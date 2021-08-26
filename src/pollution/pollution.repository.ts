import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { lastValueFrom } from 'rxjs';
import { GetPollutionArgs } from './dto/args/get-pollution-args.dto';

import { Pollution, PollutionDocument } from './Pollution';

@Injectable()
export class PollutionRepository {
  constructor(
    @InjectModel(Pollution.name)
    private pollutionModel: Model<PollutionDocument>,
    private httpService: HttpService,
  ) {}

  async find(): Promise<Pollution[]> {
    return this.pollutionModel.find({});
  }

  findMax(): Promise<Pollution[]> {
    return this.pollutionModel.find().sort('-aqius').limit(1).exec();
  }

  create(pollution: Pollution): Promise<Pollution> {
    const newPollution = new this.pollutionModel(pollution);
    return newPollution.save();
  }

  async getByLatLon(getPollutionArgs: GetPollutionArgs) {
    const response = this.httpService.get(
      `${process.env.IQAIR_API_URL}?lat=${getPollutionArgs.lat}&lon=${getPollutionArgs.lon}&key=${process.env.IQAIR_API_KEY}`,
    );
    return await lastValueFrom(response);
  }
}
