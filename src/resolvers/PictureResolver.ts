import { createWriteStream } from 'fs';
import { GraphQLUpload } from 'graphql-upload';
import path from 'path';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { UploadFileInput } from '../inputs/upload/UploadFileInput';
import { Picture } from '../models/Picture';

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
  ): Promise<void> {
    const { stream, filename, mimetype, encoding } = file;

    await new Promise((res) =>
      stream
        .pipe(
          createWriteStream(
            path.join(__dirname, '../../public/media/pictures', filename)
          )
        )
        .on('close', res)
    );

    console.log({ stream, filename, mimetype, encoding });
  }
}
