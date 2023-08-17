let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  user_id: Number,
  email: String,
  phone: String,
  pasword: Number,
  name: Number,
  address: Number,
  status: ['Active','Inactive'],
  refresh_token: String,
  created_at: String,
  update_at:String,
  deleted_at:String
});

module.exports = userSchema;
