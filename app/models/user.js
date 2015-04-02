var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema  = mongoose.Schema({
    username  : { type: String },
    password  : { type: String },
    email     : { type: String },
    registered: { type: Date, default: Date.now }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports  = mongoose.model('User', userSchema, 'user');