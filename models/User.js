const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  oauth_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  avatar: {
    type: String
  },
  desc: {
    type: String
  }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
