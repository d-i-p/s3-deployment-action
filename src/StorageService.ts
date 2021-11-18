import { DeleteObjectsCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Readable } from "node:stream";
import { lookup } from "mime-types";

export type StorageService = ReturnType<typeof createS3StorageService>;

export function createS3StorageService({ s3Client, bucket }: { s3Client: S3Client; bucket: string }) {
  return {
    async downloadFileAsString(key: string): Promise<string | null> {
      try {
        const response = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
        return await readableToString(response.Body as Readable);
      } catch (error: any) {
        if (error.code === "NoSuchKey") {
          return null;
        }

        throw error;
      }
    },
    async deleteFiles(keys: string[]): Promise<void> {
      await s3Client.send(
        new DeleteObjectsCommand({
          Bucket: bucket,
          Delete: { Objects: keys.map((Key) => ({ Key })) },
        })
      );
    },
    async uploadFile(file: {
      key: string;
      body: string | Buffer;
      CacheControl?: string;
      Metadata?: {
        [k: string]: string;
      };
    }): Promise<void> {
      console.log(`Uploading file '${file.key}'...`);
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: file.key,
          ContentType: lookup(file.key) || "text/plain",
          Body: file.body,
          CacheControl: file.CacheControl,
          Metadata: file.Metadata,
        })
      );
      console.log(`Uploading file '${file.key}' completed`);
    },
  };
}

async function readableToString(readable: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";

    readable.on("data", (chunk) => {
      data += chunk;
    });

    readable.on("error", reject);
    readable.on("end", () => resolve(data));
  });
}
