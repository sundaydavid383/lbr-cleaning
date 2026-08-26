require("dotenv").config();
const ImageKit = require("imagekit");

const getImageKitInstance = () => {
  return new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });
};

const generateUploadAuth = (fileName, fileType) => {
  const imagekit = getImageKitInstance();
  const token = Date.now().toString(36) + Math.random().toString(36).slice(2);
  const expire = Math.floor(Date.now() / 1000) + 300;

  const signature = imagekit.getAuthenticationSignature({
    token,
    expire,
  });

  return {
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    fileName,
    fileType,
  };
};

const getPublicUrl = (fileId) => {
  if (!fileId) return "";
  return `${process.env.IMAGEKIT_URL_ENDPOINT}/${fileId}`;
};

module.exports = {
  getImageKitInstance,
  generateUploadAuth,
  getPublicUrl,
};
