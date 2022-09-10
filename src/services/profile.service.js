const ProfileModel = require('../models/profile.model')
const { checkUser } = require('../utils/userExists')


const fetchProfilesService = async()=>{
    const fetchProfiles = await ProfileModel.find({}).sort({firstName: 1}).select("-__v")
    return fetchProfiles
}

const searchService = async(profileDetails)=>{
    await checkUser(ProfileModel, profileDetails)
    const searchResult = await ProfileModel.findOne(profileDetails).select("-__v")
    return searchResult
}

const createProfileService = async(profileDetails)=>{
    const newProfile = await ProfileModel.create(profileDetails) 
    const {__v, ...data} = newProfile.toObject()
    return data
}


const deleteProfileService = async(profileDetails)=>{
    await checkUser(ProfileModel, profileDetails)
    await ProfileModel.deleteOne(profileDetails)
}






module.exports = {
    createProfileService,
    deleteProfileService,
    fetchProfilesService,
    searchService
}