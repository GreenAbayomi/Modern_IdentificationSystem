const mongoose = require("mongoose");
const crypto = require("crypto");
const {
  createProfileService,
  deleteProfileService,
  fetchProfilesService,
  searchService,
  fetchAndSortProfilesService,
} = require("../services/profile.service");
const { encryptData, QRencrypt } = require("../utils/qrcode.encrypt");
const { validationSchema } = require("../utils/validation.schema");
const { cryptoEncrypt, cryptoDecrypt } = require("../utils/crypto");

const fetchProfiles = async (req, res, next) => {
  try {
    const profiles = await fetchProfilesService();
    res
      .status(200)
      .json({ msg: `Profiles fetched successfully`, data: profiles });
  } catch (error) {
    next(error);
  }
};

const fetchAndSort = async (req, res, next) => {
  try {
    const profiles = await fetchAndSortProfilesService(req.query);
    res
      .status(200)
      .json({ msg: `profiles fetched successfully`, data: profiles });
  } catch (error) {
    next(error);
  }
};

const searchProfile = async (req, res, next) => {
  try {
    const { firstName } = req.query;
    const firstNameLowerCase = firstName.toLowerCase();
    const profile = await searchService({ firstNameLowerCase });
    res.status(200).json({ msg: `result of your search is ...`, profile });
  } catch (error) {
    next(error);
  }
};

const createProfile = async (req, res, next) => {
  try {
    const profile = await validationSchema.validateAsync(req.body);
    const newProfile = await createProfileService(profile);
    const newProfileString = JSON.stringify(newProfile);

    const encryptedData = await cryptoEncrypt(newProfileString);
    const QRCode = await QRencrypt(newProfileString);
    res
      .status(201)
      .json({
        msg: `Profile created successfully`,
        data: encryptedData,
        QRCode: QRCode
      });
  } catch (error) {
    if (error.isJoi === true) error.status = 400;
    next(error);
  }
};


const verifyProfile = async(req, res, next)=>{
    const { data } = req.body
    if(!data) {
        res.status(400).json({msg: `Kindly supply the encrypted data for verification`})
    }
    const decryptedData = await cryptoDecrypt(data)
    console.log(decryptedData)
    await verifyProfileService(decryptedData)
    res.status(200).json({msg: `Verification successful.`})
}

const deleteProfile = async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
        .status(404)
        .json({ msg: `Profile with the ID supplied does not exist` });
    }
    await deleteProfileService({ _id });
    res.status(200).json({ msg: `Profile deleted successfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProfile,
  deleteProfile,
  fetchProfiles,
  searchProfile,
  fetchAndSort,
  verifyProfile
};
