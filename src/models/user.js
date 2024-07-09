const {Shema, model, mongoose} = require('mongoose'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema = new mongoose.Schema ({
    name: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    rol: {type: String, default: 'user'},
    status:{type: String, default: 'sin confirmar'}

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

UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: '10h' });
  };  

const User = mongoose.model('User', UserSchema);

module.exports = User;