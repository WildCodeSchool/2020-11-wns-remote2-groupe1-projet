import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
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

  @Column()
  @Field(() => Date)
  @CreateDateColumn()
  createAt!: Date;

  @Column()
  @Field(() => Date)
  @CreateDateColumn()
  updateAt!: Date;

  @OneToMany(() => User, (author) => author.articles)
  author!: User;

  @ManyToOne(() => Comment, (comment) => comment.article)
  comments?: Comment;
}
