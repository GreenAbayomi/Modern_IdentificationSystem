const QRCode = require("qrcode");

const QRencrypt = async (data) => {
  const encryptedData = await QRCode.toString(data);
  return encryptedData;
};

module.exports = {
    QRencrypt
};
