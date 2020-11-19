import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

@Entity()
@ObjectType()
export default class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column()
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
  @OneToMany(() => User, (author) => author.articles)
  author!: User; // Gona be replace by User Object OneToMany

  @Column()
  @Field(() => Date)
  @CreateDateColumn()
  createAt!: Date;

  @Column()
  @Field(() => Date)
  @CreateDateColumn()
  updateAt!: Date;
}
