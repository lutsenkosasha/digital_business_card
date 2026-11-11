import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Skill {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;
}