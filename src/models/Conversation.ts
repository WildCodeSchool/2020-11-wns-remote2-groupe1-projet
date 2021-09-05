// import {
//   Entity,
//   BaseEntity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToMany,
//   ManyToOne,
// } from 'typeorm';
// import { ObjectType, Field, ID } from 'type-graphql';
// import { User } from './User';
// import { Message } from './Message';

// @Entity()
// @ObjectType()
// export class Conversation extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   @Field(() => ID)
//   id!: string;

//   @Column()
//   @Field(() => String)
//   name!: string;

//   @ManyToMany(() => User, (user) => user.conversations)
//   users?: User[];

//   @ManyToOne(() => Message, (message) => message.conversation)
//   messages?: Message[];
// }
