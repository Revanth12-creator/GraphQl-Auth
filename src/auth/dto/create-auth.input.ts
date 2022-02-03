import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAuthInput {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;
}

@InputType()
export class JwtUser {
  @Field()
  token: string;

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
