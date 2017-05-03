const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'The First Name is required'
    },
    lastName:{
        type: String,
        trim: true,
        required: 'The Last Name is required'
    },
    email: {
        type: String,
 		index: true,
 		match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
    },
    password:{
        type: String,
 		validate: [
 			(password) => {
 				return password && password.length > 8;
 			},
 			'Password should be at least 8 characters long'
 		]
    },
    role: {
        type: Schema.ObjectId,
        ref: 'Role'
    },
    group: {
        type: Schema.ObjectId,
        ref: 'Group'
    },
    salt:{
 		type: String
 	},
 	provider:{
 		type: String,
 		required: 'Provider is required'
 	},
 	providerId: String,
 	providerData: {},
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

UserSchema.virtual('fullName').get(function(){
 	return this.firstName + ' ' + this.lastName;
 }).set(function(fullName){
 	const splitName = fullName.split(' ');
 	this.firstName = splitName[0] || '';
 	this.lastName = splitName[1] || '';
 });

 UserSchema.pre('save', function(next){
 	if(this.password){
 		this.salt = new
 		Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
 		this.password = this.hashPassword(this.password);
 	}
 	next();
 });

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};
UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.set('toJSON', { getters: true, virtuals: true });


mongoose.model('User', UserSchema);
