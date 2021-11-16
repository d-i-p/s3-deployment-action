import { DeleteObjectsCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { lookup } from "mime-types";
export function createS3StorageService({ s3Client, bucket }) {
    return {
        async downloadFile(name) {
            const result = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: name }));
            if (!result.Body) {
                return null;
            }
            const json = await readableToString(result.Body);
            return JSON.parse(json);
        },
        async deleteFiles(names) {
            await s3Client.send(new DeleteObjectsCommand({
                Bucket: bucket,
                Delete: { Objects: names.map((Key) => ({ Key })) },
            }));
        },
        async uploadFile(file) {
            await s3Client.send(new PutObjectCommand({
                Bucket: bucket,
                Key: file.name,
                ContentType: lookup(file.name) || "text/plain",
                Body: file.body,
                CacheControl: file.CacheControl,
                Metadata: file.Metadata,
            }));
        },
    };
}
async function readableToString(readable) {
    const data = [];
    for await (const chunk of readable) {
        data.push(chunk);
    }
    return data.join("");
}
