const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sampledb')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('CCould not connect to mongodb...',err));

const courseSchema =new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean 
})

const Course = mongoose.model('Course', courseSchema);


async function createCourse() {

    const course = new Course({
        name: 'JavaScript',
        author: 'Aimore',
        tags: ['javascript'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

// createCourse();

async function getCourse() {

    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
    .find({ author: 'Aimore', isPublished:true})
    .skip(( pageNumber -1 ) * pageSize )
    .or( [ { author: 'Node JS' }, { isPublished:false } ] )
    .limit(10)
    .sort({name: 1})
    .select({name : 1, tags: 1})
    
    console.log(courses);
}

getCourse();

