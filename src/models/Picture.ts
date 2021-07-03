import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Stream } from 'stream';
import path from 'path';
import { writeFileToPictureDirectory } from '../utils';

@Entity()
@ObjectType()
export class Picture extends BaseEntity {
  @PrimaryGeneratedColumn()
  _id!: string;

  @Index()
  @Column()
  @Generated('uuid')
  @Field(() => ID)
  id!: string;

  @Column()
  @Field(() => String)
  extension!: string;
}

const saveAndWritePictureToFile = async (
  originalFilename: string,
  stream: Stream
): Promise<Picture> => {
  const extension = path.extname(originalFilename);
  const picture = Picture.create({ extension });
  await picture.save();
  const newFilename = `${picture.id}${extension}`;
  await writeFileToPictureDirectory(stream, newFilename);
  return picture;
};

export { saveAndWritePictureToFile };
