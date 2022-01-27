# s3-deployment-action

Github action to deploy sites to an S3 bucket.

**Please note that this repository is public so it can be accessed by github actions**

## Example

```
uses: @d-i-p/s3-deployment-action@main
with:
  bucket: my-bucket
  source-dir: ./dist
  max-days: 14
env:
  AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
  AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  AWS_REGION=us-west-2
```

## Hosting config

Looks for `hosting.json` in the root of the source directory with this structure:

```typescript
export type HostingConfig = {
  files: FileConfig[];
};

export type FileConfig = {
  path: string;
  isEntrypoint?: boolean; // true, if should be uploaded last
  headers: {
    key: string;
    value: string;
  }[];
};
```

If no `hosting.config` was found, the defaults used are:

```json
{
  "files": [
    {
      "path": "index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ],
      "isEntrypoint": true
    },
    {
      "path": "index.htm",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ],
      "isEntrypoint": true
    },
    {
      "path": "manifest.json",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ],
      "isEntrypoint": true
    },
    {
      "path": "asset-manifest.json",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ],
      "isEntrypoint": true
    }
  ]
}
```
