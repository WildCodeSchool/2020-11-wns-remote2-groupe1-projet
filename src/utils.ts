import { Stream } from 'stream';
import path from 'path';
import { createReadStream, createWriteStream, mkdirSync, ReadStream } from 'fs';

const IMAGES_DIRECTORY = path.join(__dirname, '../public/media/images');

export async function writeFileToImageDirectory(
  createReadStream: ReadStream,
  filename: string
): Promise<void> {
  mkdirSync(IMAGES_DIRECTORY, { recursive: true });
  await new Promise((res) =>
  createReadStream
      .pipe(createWriteStream(path.join(IMAGES_DIRECTORY, filename)))
      .on('close', res)
  );
}
