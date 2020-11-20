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
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  content!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createAt?: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updateAt?: Date;

  @OneToMany(() => User, (author) => author.comments)
  author!: User;

  @OneToMany(() => Article, (article) => article.comments)
  article!: Article;
}
