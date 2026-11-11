import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  company!: string;

  @Field(() => String)
  position!: string;

  @Field(() => Date)
  startDate!: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date | null;

  @Field(() => [String])
  achievements!: string[];
}