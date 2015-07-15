'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: String,
  description: {
    brief: String,
    detailed: String
  },
  image: String,
  labels: Array
});

module.exports = mongoose.model('Project', ProjectSchema);