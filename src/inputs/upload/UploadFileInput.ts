import { Field, InputType } from 'type-graphql';

@InputType()
export class UploadFileInput {
  @Field(() => Function)
  createReadStream!: Function;

  @Field() filename!: string;

  @Field() mimetype!: string;

  @Field() encoding!: string;
}
