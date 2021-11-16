# s3-deployment-action

Github action to deploy sites to an S3 bucket.

**Please note that this repository is public so it can be accessed by github actions**

## Example

```
uses: @d-i-p/s3-deployment-action@main
with:
  bucket: my-bucket
  region: us-east-1
  access-key-id: AKIAIOSFODNN7EXAMPLE
  secret-access-key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
  source-dir: ./dist
  max-days: 14
```