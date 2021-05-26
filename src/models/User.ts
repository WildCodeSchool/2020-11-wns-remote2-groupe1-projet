import { hash } from 'bcrypt';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Article } from './Article';
import { Comment } from './Comment';
import { Conversation } from './Conversation';
import { Message } from './Message';
import { Classroom } from './Classroom';
import UserSession from './UserSession';
import { registerEnumType } from 'type-graphql';

export enum UserRole {
  GHOST = 'ghost',
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin',
}

registerEnumType(UserRole, {
  name: 'UserRole', // this one is mandatory
  description: 'User role in app', // this one is optional
});

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

  @Column({ nullable: true })
  @CreateDateColumn()
  @Field(() => Date)
  birthDate?: Date;

  @Column()
  @Field(() => String)
  school!: string;

  @Column()
  @Field(() => String)
  password!: string;

  @Column({ nullable: true })
  @Field(() => String)
  tel?: string;

  @Index({ unique: true })
  @Column()
  @Field(() => String)
  email!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  @Field(() => UserRole)
  role!: UserRole;

  @Column({ nullable: true })
  @Field(() => String)
  avatar?: string;

  @Column()
  @Field(() => Date)
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ default: false })
  @Field(() => Boolean)
  isActive!: boolean;

  @ManyToOne(() => Article, (article) => article.author)
  articles?: Article[];

  @ManyToOne(() => Comment, (comment) => comment.author)
  comments?: Comment[];

  @ManyToMany(() => Conversation, (conversation) => conversation.users)
  conversations?: Conversation[];

  @ManyToOne(() => Message, (message) => message.author)
  messages?: Message[];

  @ManyToMany(() => Classroom, (classroom) => classroom.teachers)
  classrooms?: Classroom[];

  @OneToMany(() => Classroom, (classroom) => classroom.students)
  classroom?: Classroom;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await hash(this.password, 10);
  }
}
export async function getUserFromSessionId(
  sessionId: string
): Promise<User | null> {
  const userSession = await UserSession.findOne(
    { uuid: sessionId },
    { relations: ['user'] }
  );
  const user = userSession ? userSession.user : null;
  return user;
}
