const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
    tc: Boolean
})
const User = mongoose.model("User", userSchema);
module.exports = User;