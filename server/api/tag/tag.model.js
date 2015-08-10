'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Tag', TagSchema);