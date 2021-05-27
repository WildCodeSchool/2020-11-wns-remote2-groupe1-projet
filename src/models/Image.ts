import path from 'path';
import { Stream } from 'stream';
import {
  Column,
  Generated,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { writeFileToImagesDirectory } from '../utils';

@Entity()
@ObjectType()
export default class Image extends BaseEntity {
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

const saveAndWriteImageToFile = async (
  originalFilename: string,
  stream: Stream
): Promise<Image> => {
  const extension = path.extname(originalFilename);
  const image = Image.create({ extension });
  await image.save();
  const newFilename = `${image.id}${extension}`;
  await writeFileToImagesDirectory(stream, newFilename);
  return image;
};

export { saveAndWriteImageToFile };