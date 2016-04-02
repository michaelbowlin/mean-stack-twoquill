var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type: String, required: '{PATH} is required!'},
    img: {type: String, required: '{PATH} is required!'},
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
                img: 'c_elk-hair-caddis',
                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Caddis']
            });
            Course.create({
                title: 'CDC Caddis',
                img: 'c_cdc-caddis',
                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Caddis']
            });
            Course.create({
                title: 'Ians Crunchy Caddis',
                img: 'c_ians-crunchy-caddis',
                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Caddis']
            });
            Course.create({
                title: 'Grannom Emerger',
                img: 'c_grannom-emerger',

                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Caddis']
            });
            Course.create({
                title: 'Blue Winged Olive',
                img: 'm_blue-winged-olive',

                featured: true,
                published: new Date('11/5/2015'),
                tags: ['Mayfly']
            });
            Course.create({
                title: 'Royal Coachman',
                img: 'm_royal-coachman',

                featured: true,
                published: new Date('11/5/2015'),
                tags: ['Mayfly']
            });
            Course.create({
                title: 'Adams',
                img: 'm_adams',

                featured: true,
                published: new Date('11/5/2015'),
                tags: ['Mayfly']
            });
            Course.create({
                title: 'Pale Morning Dun Thorax',
                img: 'm_pale-morning-dun-thorax',

                featured: true,
                published: new Date('11/5/2015'),
                tags: ['Mayfly']
            });
            Course.create({
                title: 'Salmon Fly',
                img: 's_salmon-fly',

                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Stonefly']
            });
            Course.create({
                title: 'Stimulator',
                img: 's_stimulator',

                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Stonefly']
            });
            Course.create({
                title: 'Yellow Sally',
                img: 's_yellow-sally',

                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Stonefly']
            });
            Course.create({
                title: 'The Doculator',
                img: 's_the-doculator',

                featured: true,
                published: new Date('10/5/2015'),
                tags: ['Stonefly']
            });
        }

    })

}

exports.createDefaultCourses = createDefaultCourses;
