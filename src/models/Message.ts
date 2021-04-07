import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Conversation } from './Conversation';

@Entity()
@ObjectType()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  content!: string;

  @Field(() => Date)
  @CreateDateColumn()
  createAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updateAt!: Date;

  @OneToMany(() => Conversation, (conversation) => conversation.messages)
  conversation?: Conversation;

  @OneToMany(() => User, (user) => user.messages)
  author?: User;
}
