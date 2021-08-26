import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreatePollutionInput } from './dto/create-pollution.input';
import { Pollution } from './Pollution';
import { PollutionService } from './pollution.service';

@Resolver(() => Pollution)
export class PollutionResolver {
  constructor(private readonly pollutionService: PollutionService) {}

  @Query(() => [Pollution], { name: 'Pollutions', nullable: 'items' })
  async getPollutions(): Promise<Pollution[]> {
    return this.pollutionService.findAll();
  }

  @Query(() => [Pollution], { name: 'Pollutions', nullable: 'items' })
  async getPollutionsMax(): Promise<Pollution[]> {
    return this.pollutionService.findMax();
  }

  @Mutation(() => Pollution)
  async createPollution(
    @Args('createPollutionData') createPollutionData: CreatePollutionInput,
  ): Promise<Pollution> {
    return this.pollutionService.create(createPollutionData);
  }
}
