// A model is a class that allows us to interact with a specific table in our database,
// With TypeORM, we define our database models with classes and decorators.
// Which GraphQL we need to define our object types,
// Like our models, we can simply define our object types by using classes and decorators.

import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Article } from './Article';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  // BaseEntity class  contains useful methods to access our table
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column() // typeorm decorator
  @Field(() => String) // graphql decorator
  content!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => User, (author) => author.comments)
  author!: User;

  @OneToMany(() => Article, (article) => article.comments)
  article!: Article;
}
