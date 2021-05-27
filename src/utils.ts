  
import { createWriteStream, mkdirSync } from 'fs';
import path from 'path';
import { Stream } from 'stream';

const IMAGES_DIRECTORY = path.join(__dirname, '../public/media/images');

export function writeFileToImagesDirectory(
  stream: Stream,
  filename: string
): Promise<void> {
  mkdirSync(IMAGES_DIRECTORY, { recursive: true });
  return new Promise((res) =>
    stream
      .pipe(createWriteStream(path.join(IMAGES_DIRECTORY, filename)))
      .on('close', res)
  );
}