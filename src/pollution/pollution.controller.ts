import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetPollutionArgs } from './dto/args/get-pollution-args.dto';
import { PollutionService } from './pollution.service';

@Controller('api/pollution')
export class PollutionController {
  constructor(private readonly service: PollutionService) {}

  @Get('/')
  async index() {
    return await this.service.findAll();
  }

  @Post('/')
  async getPollution(@Body() getPollutionArgs: GetPollutionArgs) {
    return await this.service.getByLatLon(getPollutionArgs);
  }

  @Get('/max')
  async max() {
    return await this.service.findMax();
  }
}
