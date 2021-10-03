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
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Post } from './Post';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
  // BaseEntity class  contains useful methods to access our table
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  commentID!: string;

  @Column() // typeorm decorator
  @Field(() => String) // graphql decorator
  content!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User)
  @Field((type) => User)
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  @Field(() => Post)
  @JoinColumn({ name: 'postID' })
  post!: Post;
}
