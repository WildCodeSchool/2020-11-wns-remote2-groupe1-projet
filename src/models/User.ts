import { hash } from 'bcrypt';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  BeforeInsert,
  MoreThanOrEqual,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Post } from './Post';
import { Comment } from './Comment';
import UserSession from './UserSession';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  userID!: string;

  @Column({ unique: true })
  @Field(() => String)
  username!: string;

  @Column()
  @Field(() => String)
  firstName!: string;

  @Column()
  @Field(() => String)
  lastName!: string;

  @Column({
    nullable: true,
    default: '',
  })
  @Field(() => String)
  birthDate?: string;

  @Column()
  @Field(() => String)
  password!: string;

  @Index({ unique: true })
  @Column()
  @Field(() => String)
  email!: string;

  @Column({ nullable: true, default: '' })
  @Field(() => String)
  phoneNo?: string;

  @Column({ nullable: true, default: '' })
  @Field(() => String)
  country?: string;

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

  @OneToMany(() => Post, (post) => post.user)
  @Field(() => Post)
  posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => Comment)
  comments?: Comment[];

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
      return `${users[0].username} registered today.`;
    case 2:
      return `${users[0].username} and ${users[1].username} registered today.`;
    case 3:
      return `${users[0].username}, ${users[1].username} and ${users[2].username} registered today.`;
    default:
      return `${users[0].username}, ${users[1].username} and ${
        users.slice(2).length
      } others registered today.`;
  }
};
