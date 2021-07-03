import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@Entity()
@ObjectType()
export class Picture extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id!: string;

  @Index()
  @Column()
  @Generated('uuid')
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  extension!: string;
}
