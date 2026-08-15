const { S3Client, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");

const getR2Config = () => {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME;
  const publicUrl = process.env.R2_PUBLIC_URL;

  if (!accountId || !accessKeyId || !secretAccessKey || !bucketName) {
    throw new Error("Missing Cloudflare R2 environment variables");
  }

  return {
    accountId,
    accessKeyId,
    secretAccessKey,
    bucketName,
    publicUrl: publicUrl || `https://${bucketName}.${accountId}.r2.cloudflarestorage.com`,
  };
};

const createR2Client = () => {
  const config = getR2Config();
  return new S3Client({
    region: "auto",
    endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
};

const generatePresignedUploadUrl = async (key, contentType, maxSizeBytes = 5 * 1024 * 1024) => {
  const config = getR2Config();
  const s3 = createR2Client();

  const command = new PutObjectCommand({
    Bucket: config.bucketName,
    Key: key,
    ContentType: contentType,
    ACL: "public-read",
  });

  const { getSignedUrl } = await import("@aws-sdk/s3-request-presigner");
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

  return {
    uploadUrl,
    publicUrl: `${config.publicUrl}/${key}`,
    key,
  };
};

const deleteObject = async (key) => {
  const config = getR2Config();
  const s3 = createR2Client();

  const command = new DeleteObjectCommand({
    Bucket: config.bucketName,
    Key: key,
  });

  await s3.send(command);
  return { success: true };
};

const normalizeKey = (path) => {
  const clean = path.replace(/^\/+/, "").replace(/\\/g, "/");
  if (!clean.startsWith("website/")) {
    return `website/${clean}`;
  }
  return clean;
};

module.exports = {
  getR2Config,
  createR2Client,
  generatePresignedUploadUrl,
  deleteObject,
  normalizeKey,
};
