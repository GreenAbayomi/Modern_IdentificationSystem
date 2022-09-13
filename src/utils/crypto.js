const crypto = require("crypto");
const { builtinModules } = require("module");

const algorithm = "aes-256-cbc";
const securityKey = crypto.randomBytes(32);
const initVector = crypto.randomBytes(16);

const cryptoEncrypt = (data) => {
  const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
  let encryptedData = cipher.update(data, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};

const cryptoDecrypt = (data) => {
    const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector)
    let decryptedData = decipher.update(data, "hex", "utf-8")
    decryptedData += decipher.final("utf-8")
    return decryptedData
    
};




module.exports = {
  cryptoEncrypt,
  cryptoDecrypt
};
