import mongoose from 'mongoose'
// import User from '../models/user.model'

const LessonSchema = new mongoose.Schema({
    title: String,
    content: String,
    resource_url: String
})

const Lesson = mongoose.model('Lesson', LessonSchema)

const CourseSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: "Category is required"
    },
    image: {
        data: Buffer,
        contentType: String
    },
    lessons: [LessonSchema],
    published: {
        type: Boolean,
        default: false
    },
    instructor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})
 
export default mongoose.model('Course', CourseSchema)