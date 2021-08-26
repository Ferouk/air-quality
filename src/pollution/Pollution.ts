import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PollutionDocument = Pollution & Document;

@ObjectType()
@Schema()
export class Pollution {
  @Field()
  @Prop()
  ts: Date;

  @Field()
  @Prop()
  aqius: number;

  @Field()
  @Prop()
  mainus: string;

  @Field()
  @Prop()
  aqicn: number;

  @Field()
  @Prop()
  maincn: string;
}

export const PollutionSchema = SchemaFactory.createForClass(Pollution);
