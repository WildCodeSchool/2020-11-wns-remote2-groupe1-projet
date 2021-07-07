import { Stream } from 'stream';
import path from 'path';
import { createWriteStream, mkdirSync } from 'fs';

const IMAGES_DIRECTORY = path.join(__dirname, '../public/media/images');

export async function writeFileToImageDirectory(
  stream: Stream,
  filename: string
): Promise<void> {
  mkdirSync(IMAGES_DIRECTORY, { recursive: true });
  await new Promise((res) =>
    stream
      .pipe(createWriteStream(path.join(IMAGES_DIRECTORY, filename)))
      .on('close', res)
  );
}
