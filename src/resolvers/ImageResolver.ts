import { GraphQLUpload } from 'graphql-upload';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { UploadFileInput } from '../inputs/upload/UploadFileInput';
import { Image, saveAndWriteImageToFile } from '../models/Image';

@Resolver()
export default class ImageResolver {
  @Query(() => [Image])
  images(): Promise<Image[]> {
    return Image.find();
  }

  @Mutation(() => Image)
  async uploadImage(
    @Arg('file', () => GraphQLUpload)
    file: UploadFileInput
  ): Promise<Image> {
    const { filename, stream } = file;
    return saveAndWriteImageToFile(filename, stream);
  }
}
