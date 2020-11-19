import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

@Entity()
@ObjectType()
export class Classroom extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  name!: string;

  @ManyToMany(() => User, (user) => user.classrooms)
  teachers?: User[];

  @ManyToOne(() => User, (user) => user.classroom)
  students?: User[];
}