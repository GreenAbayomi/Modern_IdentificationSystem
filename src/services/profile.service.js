const ProfileModel = require('../models/profile.model')
const { checkUser } = require('../utils/userExists')


const fetchProfilesService = async()=>{
    const fetchProfiles = await ProfileModel.find({}).select("-__v")
    return fetchProfiles
}

const fetchAndSortProfilesService = async(profileDetails)=>{
    const { page = 1, pageSize = 10} = profileDetails
    const fetchAndSort = await ProfileModel.find({}).sort({firstName: 1}).limit(pageSize * 1).skip((page - 1) * pageSize).select("-__v")
    return fetchAndSort
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


const verifyProfileService = async(profileDetails)=>{
    const verifiedProfile = await checkUser(ProfileModel, profileDetails)
}

const deleteProfileService = async(profileDetails)=>{
    const { _id } = profileDetails
    await checkUser(ProfileModel, {_id})
    await ProfileModel.deleteOne({_id}) 
   
}






module.exports = {
    createProfileService,
    deleteProfileService,
    fetchProfilesService,
    fetchAndSortProfilesService,
    searchService,
    verifyProfileService
}