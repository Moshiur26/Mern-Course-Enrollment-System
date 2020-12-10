import mongoose from 'mongoose'
// import User from '../models/user.model'


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
    image: {
        type: Buffer,
        contentType: String
    },
    published: {
        type: Boolean,
        default: false
    },
    instructor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User_Class_Room'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})
 
export default mongoose.model('Course', CourseSchema)