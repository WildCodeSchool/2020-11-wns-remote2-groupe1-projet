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
import { writeFileToImageDirectory } from '../utils';

@Entity()
@ObjectType()
export class Image extends BaseEntity {
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
  await writeFileToImageDirectory(stream, newFilename);
  return image;
};

export { saveAndWriteImageToFile };
