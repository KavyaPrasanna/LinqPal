const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {uuid} = require('uuidv4');

var adminUserSchema = new Schema({
  email    : { type: String,
              required: true,
              unique: true },
  password : { type: String,
              required: true }
})

module.exports = mongoose.model('admin', adminUserSchema, 'admin');
