import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
@ObjectType()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  title!: string;

  @Column()
  @Field(() => String)
  banner!: string;

  @Column()
  @Field(() => String)
  content!: string;

  @Column({ default: false })
  @Field(() => Boolean)
  isVisible!: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => User, (author) => author.articles)
  author?: User;

  @ManyToOne(() => Comment, (comment) => comment.article)
  comments?: Comment;
}
