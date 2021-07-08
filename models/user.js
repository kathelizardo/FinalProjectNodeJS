const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ModelSchema = new Schema({
    name: { type: String, required: true },
    date_birth: { type: Date, required: true },
    status: {type: Boolean, default: true}
})

module.exports =  mongoose.model('User', ModelSchema)