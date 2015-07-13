'use strict';

var _ = require('lodash');
var Project = require('./project.model');

// for image upload
var uuid = require('node-uuid'),
    multiparty = require('multiparty'),
    fs = require('fs');

// image upload
exports.postImage = function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        var file = files.file[0];
        var contentType = file.headers['content-type'];
        var tmpPath = file.path;
        var extIndex = tmpPath.lastIndexOf('.');
        var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
        // uuid is for generating unique filenames. 
        var fileName = uuid.v4() + extension;
        var destPath = __dirname + '/upload/' + fileName;

        var is = fs.createReadStream(tmpPath);
        var os = fs.createWriteStream(destPath);

        if(is.pipe(os)) {
          fs.unlink(tmpPath, function (err) { //To unlink the file from temp path after copy
              if (err) {
                  console.log(err);
              }
          });
          return res.json(fileName);
        } else {
          return res.json('File not uploaded');
        }
    });
};

// Get uploaded image
exports.getImage = function(req, res) {
  var file = req.params.file;
  var img = fs.readFileSync(__dirname + "/upload/" + file);
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
};

// Get list of projects
exports.index = function(req, res) {
  Project.find(function (err, projects) {
    if(err) { return handleError(res, err); }
    return res.json(200, projects);
  });
};

// Get a single project
exports.show = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    return res.json(project);
  });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
  Project.create(req.body, function(err, project) {
    if(err) { return handleError(res, err); }
    return res.json(201, project);
  });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    var updated = _.merge(project, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, project);
    });
  });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    project.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}