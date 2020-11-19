import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

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
  @Field(() => String)
  author!: string; // Gona be replace by User Object OneToMany

  @Column()
  @Field(() => Date)
  @CreateDateColumn()
  createAt!: Date;

  @Column()
  @Field(() => Date)
  @CreateDateColumn()
  updateAt!: Date;
}
