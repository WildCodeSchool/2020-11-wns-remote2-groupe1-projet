import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Comment } from './Comment';

@Entity()
@ObjectType()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  postID!: string;

  @Column()
  @Field(() => String)
  title!: string;

  @Column()
  @Field(() => String)
  image!: string;

  @Column()
  @Field(() => String)
  content!: string;

  @Column()
  @Field(() => Boolean)
  isPublished!: boolean;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.posts)
  @Field(() => User)
  user!: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field(() => [Comment])
  comments?: Comment[];
}
