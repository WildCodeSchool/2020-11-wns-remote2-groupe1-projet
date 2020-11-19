import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Article } from './Article';
import { Comment } from './Comment';

export enum UserRole {
  GHOST = 'ghost',
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}
@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  firstName!: string;

  @Column()
  @Field(() => String)
  lastName!: string;

  @Column()
  @CreateDateColumn()
  @Field(() => Date)
  birth_date!: Date;

  @Column()
  @Field(() => String)
  home!: string;

  @Column()
  @Field(() => String)
  password!: string;

  @Column()
  @Field(() => String)
  tel?: string;

  @Index({ unique: true })
  @Column()
  @Field(() => String)
  email!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GHOST,
  })
  @Field(() => UserRole)
  role!: UserRole;

  @Column()
  @Field(() => String)
  avatar?: string;

  @Column()
  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @Field(() => Date)
  @CreateDateColumn()
  updateAt!: Date;

  @Column({ default: false })
  @Field(() => Boolean)
  isActive!: boolean;

  @ManyToOne(() => Article, (article) => article.author)
  articles?: Article[];

  @ManyToOne(() => Comment, (comment) => comment.author)
  comments?: Comment[];
}
