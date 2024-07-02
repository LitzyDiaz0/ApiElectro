const {Shema, model, mongoose} = require('mongoose'); 
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema ({
    name: { type: String, required: true},
    password: { type: String, required: true}

},{
    timestamps: true
})

const User = mongoose.model('User', UserSchema);


UserSchema.methods.encryptPassword = async password =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = User;