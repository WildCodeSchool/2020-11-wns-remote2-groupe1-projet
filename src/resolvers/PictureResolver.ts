import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import path from 'path';
import { Stream } from 'stream';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { UploadFileInput } from '../inputs/upload/UploadFileInput';
import { Picture, saveAndWritePictureToFile } from '../models/Picture';

@Resolver()
export default class PictureResolver {
  @Query(() => [Picture])
  pictures(): Promise<Picture[]> {
    return Picture.find();
  }

  @Mutation(() => Picture)
  async uploadPicture(
    @Arg('file', () => GraphQLUpload)
    file: UploadFileInput
  ): Promise<Picture> {
    const { filename, stream } = file;
    return saveAndWritePictureToFile(filename, stream);
  }
}
