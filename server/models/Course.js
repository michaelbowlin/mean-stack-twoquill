var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type: String, required: '{PATH} is required!'},
    featured: {type: Boolean, required: '{PATH} is required!'},
    published: {type: Date, required: '{PATH} is required!'},
    tags: [String]
});

// Create model based on schema
var Course = mongoose.model('Course', courseSchema);

// Create default courses if none in db
function createDefaultCourses() {
    Course.find({}).exec(function (err, collection) {
        if (collection.length === 0) {

            Course.create({
                title: 'Elk Hair Caddis',
                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Caddis']
            });
            Course.create({
                title: 'CDC Caddis',
                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Caddis']
            });
            Course.create({
                title: 'Ians Crunchy Caddis',
                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Caddis']
            });
            Course.create({
                title: 'Grannom Emerger',
                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Caddis']
            });
            Course.create({
                title: 'Blue Winged Olive',
                featured: true,
                published: new Date('11/5/2015'),
                tags: ['Mayfly']
            });
            Course.create({
                title: 'Royal Coachman',
                featured: true,
                published: new Date('11/5/2015'),
                tags: ['Mayfly']
            });
            Course.create({
                title: 'Adams',
                featured: true,
                published: new Date('11/5/2015'),
                tags: ['Mayfly']
            });
            Course.create({
                title: 'Pale Morning Dun Thorax',
                featured: true,
                published: new Date('11/5/2015'),
                tags: ['Mayfly']
            });
            Course.create({
                title: 'Salmon Fly',
                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Stonefly']
            });
            Course.create({
                title: 'Stimulator',
                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Stonefly']
            });
            Course.create({
                title: 'Yellow Sally',
                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Stonefly']
            });
            Course.create({
                title: 'The Doculator',
                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Stonefly']
            });
        }

    })

}

exports.createDefaultCourses = createDefaultCourses;