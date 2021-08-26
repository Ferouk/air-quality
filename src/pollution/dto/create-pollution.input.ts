import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreatePollutionInput {
  @Field()
  @IsNotEmpty()
  ts: Date;

  @Field()
  @IsNotEmpty()
  aqius: number;

  @Field()
  @IsNotEmpty()
  mainus: string;

  @Field()
  @IsNotEmpty()
  aqicn: number;

  @Field()
  @IsNotEmpty()
  maincn: string;
}
