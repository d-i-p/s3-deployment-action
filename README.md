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