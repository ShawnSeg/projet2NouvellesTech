const mongoose = require('mongoose')

const entreeAPISchema = new mongoose.Schema({
    date:{
        type: Date,
        required:true,
        default:Date.now

    },
    ip_adresse:{
        type: String,
        required:true,
        default:"0.0.0.0"
    },
    type_requete:{
        type: String,
        required:true
    }
})

module.exports=mongoose.model("EntreeApi", entreeAPISchema)