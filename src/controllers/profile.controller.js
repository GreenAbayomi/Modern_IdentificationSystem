const QRCode = require('qrcode')
const { createProfileService, deleteProfileService, fetchProfilesService, searchService } = require("../services/profile.service")
const { encryptData } = require('../utils/qrcode.encrypt')
const { validationSchema } = require("../utils/validation.schema")



const fetchProfiles = async(req, res, next)=>{
    try {
        const profiles = await fetchProfilesService()
        res.status(200).json({msg: `Profiles fetched successfully`, data: profiles})
    } catch (error) {
        next(error)
    }
}

const searchProfile = async(req, res , next)=>{
    try {
        const { firstName } = req.query
        const profile = await searchService({firstName})

        res.status(200).json({msg: `result of your search is ...`, profile})
    } catch (error) {
        next(error)
    }
}



const createProfile = async(req, res, next)=>{
    try {
        const profile = await validationSchema.validateAsync(req.body)
        const newProfile = await createProfileService(profile)
        const newProfileString = JSON.stringify(newProfile) 
        const encryptedData = await encryptData(newProfileString)
        res.status(201).json({msg:`Profile created successfully`, data: encryptedData})
    } catch (error) {
        if(error.isJoi === true) error.status = 400
        next(error)
}
}

const deleteProfile = async(req, res, next)=>{
    try {
        const { id } = req.params
        await deleteProfileService({ id })
        return res.status(200).json({msg: `Profile deleted successfully`})
    } catch (error) {
        next(error)
    }
}





module.exports = {
    createProfile,
    deleteProfile,
    fetchProfiles,
    searchProfile
}
