const {Shema, model, mongoose} = require('mongoose'); 
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema ({
    name: { type: String, required: true},
    password: { type: String, required: true}

},{
    timestamps: true
})


UserSchema.methods.encryptPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);


module.exports = User;