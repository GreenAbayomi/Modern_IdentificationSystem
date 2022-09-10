const QRCode = require('qrcode')


const encryptData = async(data)=>{
   const encryptedData = await QRCode.toDataURL(data)
   return encryptedData
}


module.exports = {
    encryptData
}