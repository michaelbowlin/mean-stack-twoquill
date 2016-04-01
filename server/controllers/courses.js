// Needs new model
var Course = require('mongoose').model('Course');

exports.getCourses = function(req,res) {
    Course.find({}).exec(function(err, collecion) {
        res.send(collecion);
    })
}