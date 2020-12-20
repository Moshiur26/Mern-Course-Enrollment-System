import formidable from 'formidable';
import fs from 'fs';
import dbErrorHandler from '../helpers/dbErrorHandler';
import Course from '../models/course.model';
import defaultImage from '../../client/assets/images/course-default.jpg'
import { extend } from 'lodash';

const courseById = async (req, res, next, id) => {
    // console.log("course by id, id: ", id);
    try {
        let course = await Course.findById(id).populate('instructor', '_id name')
        if (!course) {
            return res.status(400).json({
                error: "Course is not found"
            })
        }
        req.course = course
        next()
    } catch(err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        })
    }
}
const read = (req, res) => {
    req.course.image = undefined
    return res.json(req.course)
} 

const create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    // console.log("######### into course create function");
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let course = new Course(fields)
        course.instructor = req.profile
        if (files.image) {
            course.image.data = fs.readFileSync(files.image.path)
            course.image.contentType = files.image.type
        }
        try {
            let result = await course.save()
            // console.log("########### course create result: ", result);
            res.json(result)
        } catch(err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
    })
}
const update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtension = true

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Phot could not be uploaded"
            })
        }
        let course = req.course
        course = extend(course, fields)
        if (fields.lessons) {
            course.lessons = JSON.parse(fields.lessons)
        }
        if (files.image) {
            course.image.data = fs.readFileSync(files.image.data)
            course.image.contentType = files.image.type
        }
        course.updated = Date.now()
        try {
            await course.save()
            res.json(course)
        } catch (err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
    })
}

const remove = async (req, res) => {
    try {
        let course = req.course
        let deleteCourse = await course.remove()
        res.json(deleteCourse)
    } catch(err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        })
    }
}
  
const listByInstructor =  (req, res) => {
    // console.log("##### list by user");
    Course.find({instructor: req.profile._id}, (err, courses) => {
        if (err) {
            // console.log("##### list by user: get error:", err)
            return res.status(400).json({
                // error: dbErrorHandler.getErrorMessage(err)
                error: err
            })
        }
        // console.log("##### list by user: ", courses);
        res.json(courses)
    }).populate('instructor', '_id name')
}
const listPublished = (req, res) => {
    Course.find({published: true}, (err, courses) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        } else {
            res.json(courses)
        }
    }).populate('instructor', '_id name')
}
const photo = (req, res, next) => {
    if (req.course.image && req.course.image.data) {
        res.set('Content-Type', req.course.image.contentType)
        return res.send(req.course.image.data)
    }
    next()
}
const defaultPhoto = (req, res) => {
    return res.sendFile(process.cwd() + defaultImage)
}
const isInstructor = (req, res, next) => {
    const isInstructor = req.course && req.auth && req.course.instructor._id == req.auth._id
    if (!isInstructor) {
        return res.status(403).json({
            error: "User is not Authorized"
        })
    }
    next()
}
const newLesson = async (req, res) => {
    try {
        let lesson = req.body.lesson
        let result = await Course.findByIdAndUpdate(req.course._id, {$push: {lessons: lesson}, updated: Date.now()}, {new: true})
            .populate('instructor', '_id name')
            .exec()
        res.json(result)
    } catch(err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        })
    }
}

export default { create, courseById, listByInstructor, read, photo, defaultPhoto, isInstructor, newLesson, update, remove, listPublished }