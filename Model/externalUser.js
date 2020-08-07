const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {uuid} = require('uuidv4');

var externalUserSchema = new Schema({
    first_name: { type: String,
                  required: true },
    last_name : { type: String,
                required: true },
    telephone_number : { type: String,
                      required: true,
                    unique: true },
    address : { type: String,
              required: true },
    ssn : { type: String,
            required: true,
          unique: true }
})

module.exports = mongoose.model('ExternalUser', externalUserSchema);
