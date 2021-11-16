import { DeleteObjectsCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "node:stream";
import { lookup } from "mime-types";

export type StorageService = ReturnType<typeof createS3StorageService>;

export function createS3StorageService({ s3Client, bucket }: { s3Client: S3Client; bucket: string }) {
  return {
    async downloadFile(name: string): Promise<unknown | null> {
      const result = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: name }));

      if (!result.Body) {
        return null;
      }

      const json = await readableToString(result.Body as Readable);
      return JSON.parse(json);
    },
    async deleteFiles(names: string[]): Promise<void> {
      await s3Client.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: { Objects: names.map((Key) => ({ Key })) },
        })
      );
    },
    async uploadFile(file: {
      name: string;
      body: unknown;
      CacheControl?: string;
      Metadata?: {
        [k: string]: string;
      };
    }): Promise<void> {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: file.name,
          ContentType: lookup(file.name) || "text/plain",
          Body: file.body,
          CacheControl: file.CacheControl,
          Metadata: file.Metadata,
        })
      );
    },
  };
}

async function readableToString(readable: Readable): Promise<string> {
  const data: string[] = [];
  for await (const chunk of readable) {
    data.push(chunk);
  }

  return data.join("");
}
