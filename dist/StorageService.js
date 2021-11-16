"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createS3StorageService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const mime_types_1 = require("mime-types");
function createS3StorageService({ s3Client, bucket }) {
    return {
        async downloadFileAsString(name) {
            const result = await s3Client.send(new client_s3_1.GetObjectCommand({ Bucket: bucket, Key: name }));
            if (result.Body == null) {
                return null;
            }
            return await readableToString(result.Body);
        },
        async deleteFiles(names) {
            await s3Client.send(new client_s3_1.DeleteObjectsCommand({
                Bucket: bucket,
                Delete: { Objects: names.map((Key) => ({ Key })) },
            }));
        },
        async uploadFile(file) {
            await s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: bucket,
                Key: file.name,
                ContentType: (0, mime_types_1.lookup)(file.name) || "text/plain",
                Body: file.body,
                CacheControl: file.CacheControl,
                Metadata: file.Metadata,
            }));
        },
    };
}
exports.createS3StorageService = createS3StorageService;
async function readableToString(readable) {
    var e_1, _a;
    const data = [];
    try {
        for (var readable_1 = __asyncValues(readable), readable_1_1; readable_1_1 = await readable_1.next(), !readable_1_1.done;) {
            const chunk = readable_1_1.value;
            data.push(chunk);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (readable_1_1 && !readable_1_1.done && (_a = readable_1.return)) await _a.call(readable_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return data.join("");
}
