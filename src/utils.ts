import { Stream } from 'stream';
import path from 'path';
import { createWriteStream, mkdirSync } from 'fs';

const PICTURES_DIRECTORY = path.join(__dirname, '../public/media/pictures');

export async function writeFileToPictureDirectory(
  stream: Stream,
  filename: string
): Promise<void> {
  mkdirSync(PICTURES_DIRECTORY, { recursive: true });
  await new Promise((res) =>
    stream
      .pipe(createWriteStream(path.join(PICTURES_DIRECTORY, filename)))
      .on('close', res)
  );
}
