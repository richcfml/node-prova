const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TerminalSchema = new Schema({
    group: {
        type: Schema.ObjectId,
        ref: 'Group'
    },
    environment: {
        type: Schema.ObjectId,
        ref: 'Environment'
    },
    platform: {
        type: Schema.ObjectId,
        ref: 'Platform'
    },
    targetURL:{
        type: String,
        trim: true
    },
    host:{
        type:String,
        trim: true
    },
    port:{
        type: String,
        trim:true
    },
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    gatewayID:{
        type: String,
        trim: true
    },
    keyID:{
        type: String,
        trim: true
    },
    hmacKey:{
        type: String,
        trim: true
    },
    gatewayPassword:{
        type: String,
        trim: true
    },
    userID:{
        type: String,
        trim: true
    },
    pfacToken:{
        type: String,
        trim: true
    },
    pfacHmac:{
        type: String,
        trim: true
    },
    active:Boolean,
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Terminal', TerminalSchema);
