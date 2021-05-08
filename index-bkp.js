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

// eq (equal)
// ne (not equal)
// gt (greater than)
// gte (greater than or equal to )
// lt (lesser that)
// lte (lesser that or equal to)
// in 
// nin (not in)


//or
//and 

    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course
    //.find({ author: 'Aimore', isPublished:true})
    //.find({price: {$gte:10000, $lte: 25000}})
    //.find({price: {$in: [1,3,5,4] } })
//Regular Expression 
    //Starts from 
    .find({ author: /^Aimore/ })

    //Ends with 
    .find({ author: /more$/i })

    //Contains
    .find({ author: /.*Aimore.*/i })

    .find() 
    .skip(( pageNumber -1 ) * pageSize )
    .or( [ { author: 'Node JS' }, { isPublished:false } ] )
    .limit(10)
    .sort({name: 1})
    .select({name : 1, tags: 1})
    //.count();
    console.log(courses);
}
// getCourse();

async function updateCourse(id) {
    //const course = await Course.findById(id);
    const result = await Course.updateOne({_id: id }, {
        $set: {
            isPublished: true,
            author: 'Author'
            }
    })
    //if (!course) return;

    //course.isPublished = false;
    //course.author = 'Another Author';

    // course.set({
    //     isPublished: false,
    //     author: 'Another Author'
    // });
    //const result = await course.save();
    console.log(result);
}

// updateCourse('6088d3654c5414458cd38b17');

async function removeCourse(id) {
    //const result = await Course.deleteMany({_id: id});
    const course = await Course.findByIdAndRemove(id);

    console.log(course);
}
removeCourse('6088d339732b830d88f59224');

