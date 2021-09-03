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
  MoreThanOrEqual,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Article } from './Article';
// import { Comment } from './Comment';
// import { Conversation } from './Conversation';
// import { Message } from './Message';
import UserSession from './UserSession';

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
  password!: string;

  @Column({ nullable: true })
  @Field(() => String)
  tel?: string;

  @Index({ unique: true })
  @Column()
  @Field(() => String)
  email!: string;

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

  // @ManyToOne(() => User, (user) => user.articles)
  // user!: User;
  // @ManyToOne(() => Article)
  // @Field(() => Article)
  // article!: Article;

  @OneToMany(() => Article, (article) => article.user)
  articles?: Article[];

  // @ManyToOne(() => Comment, (comment) => comment.user)
  // comments?: Comment[];

  // @ManyToMany(() => Conversation, (conversation) => conversation.users)
  // conversations?: Conversation[];

  // @ManyToOne(() => Message, (message) => message.user)
  // messages?: Message[];

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

export const getRecentUsers = async (): Promise<string> => {
  const now = new Date(Date.now());
  now.setHours(now.getHours() - 24);

  const users = await User.find({
    where: { createdAt: MoreThanOrEqual(now) },
  });
  switch (users.length) {
    case 0:
      return 'Nobody registered today.';
    case 1:
      return `${users[0].firstName} registered today.`;
    case 2:
      return `${users[0].firstName} and ${users[1].firstName} registered today.`;
    case 3:
      return `${users[0].firstName}, ${users[1].firstName} and ${users[2].firstName} registered today.`;
    default:
      return `${users[0].firstName}, ${users[1].firstName} and ${
        users.slice(2).length
      } others registered today.`;
  }
};
