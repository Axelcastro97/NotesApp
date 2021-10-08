const mongoose = require('mongoose');
const {Schema} = mongoose;
const crypt = require('bcryptjs');

const userSchema = new Schema ({ 
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    }, 
    email: {
        type: String,
        required: true,
    }, 
    password: {
        type: String, 
        required: true,
    },
    date: {
        type: Date, 
        default: Date.now,
    }
});

userSchema.method.encryptPassword = async (password) => {
    const salt = await crypt.genSalt(10);
    const hash = crypt.hash(password, salt);
    return hash; 
}

userSchema.methods.matchPassword = async function (password) {
    return await crypt.compare(password, this.password);
}


module.exports = mongoose.model('User', userSchema)