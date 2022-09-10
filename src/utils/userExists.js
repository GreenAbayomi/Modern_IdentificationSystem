exports.checkUser = async(Model, query)=>{
    const user = await Model.findOne({...query})
    if(!user || !user?._id){
        throw new Error(`No useer found`)
    }
    return true
}