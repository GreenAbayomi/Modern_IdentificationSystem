const {Schema, model} = require('mongoose')

const ProfileSchema = new Schema({
    firstName:{
        type: String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    }
},
    {
        timestamps:{
            createdAt: 'dateCreated',
            updatedAt:false
        }
    }
)

const ProfileModel = new model('Profile', ProfileSchema)

module.exports = ProfileModel