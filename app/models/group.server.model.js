const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GroupSchema = new Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    description:{
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

mongoose.model('Group', GroupSchema);
