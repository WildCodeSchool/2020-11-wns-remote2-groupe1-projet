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
    const { createReadStream, filename } = await file;
    const stream = createReadStream();
    return saveAndWriteImageToFile(filename, stream);
  }
  @Mutation(() => Boolean)
  async deleteImage(@Arg('id') id: string): Promise<boolean> {
    const image = await Image.findOne({ where: { id } });

    if (!image) {
      throw new Error(`The image with id: ${id} does not exist!`);
    }

    await image.remove();
    return true;
  }
}
