import { Injectable } from '@nestjs/common';
import { GetPollutionArgs } from './dto/args/get-pollution-args.dto';
import { CreatePollutionInput } from './dto/create-pollution.input';
import { Pollution } from './Pollution';
import { PollutionRepository } from './pollution.repository';

@Injectable()
export class PollutionService {
  constructor(private readonly repository: PollutionRepository) {}

  async findAll(): Promise<Pollution[]> {
    return await this.repository.find();
  }

  async findMax(): Promise<Pollution[]> {
    return await this.repository.findMax();
  }

  async create(createPollutionDto: CreatePollutionInput): Promise<Pollution> {
    return await this.repository.create({
      ...createPollutionDto,
    });
  }

  async getByLatLon(getPollutionArgs: GetPollutionArgs) {
    return {
      result: {
        pollution: (await this.repository.getByLatLon(getPollutionArgs)).data
          .data.current.pollution,
      },
    };
  }
}
