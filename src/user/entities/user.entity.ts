import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Field()
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column({ nullable: false })
  email: string;

  @Field()
  @Column({ nullable: true })
  password: string;
}

@ObjectType()
export class Jwt {
  @Field()
  token: string;

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
