import formidable from 'formidable';
import fs from 'fs';
import dbErrorHandler from '../helpers/dbErrorHandler';
import Course from '../models/course.model';

const courseById = async (req, res, next, id) => {
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

const create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    console.log("######### into course create function");
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
            console.log("########### course create result: ", result);
            res.json(result)
        } catch(err) {
            return res.status(400).json({
                error: dbErrorHandler.getErrorMessage(err)
            })
        }
    })
}

export default { create, courseById }