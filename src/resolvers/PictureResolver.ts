import { GraphQLUpload } from 'graphql-upload';
import { Resolver, Query, Mutation, Arg, Ctx, Field, Int } from 'type-graphql';
import { UploadFileInput } from '../inputs/upload/UploadFileInput';
import { Picture } from '../models/Picture';

@Resolver()
export default class PictureResolver {
  @Query(() => [Picture])
  pictures(): Promise<Picture[]> {
    return Picture.find();
  }

  @Mutation(() => Picture)
  uploadPicture(
    @Arg('file', (type) => GraphQLUpload) file: UploadFileInput
  ): void {
    const { stream, filename, mimetype, encoding } = file;

    //write picture to directory /public/media/pictures

    console.log({ stream, filename, mimetype, encoding });
  }
}
