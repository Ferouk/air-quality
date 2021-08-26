import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetPollutionArgs {
  @Field()
  @IsNotEmpty()
  lat: number;

  @Field()
  @IsNotEmpty()
  lon: number;
}
