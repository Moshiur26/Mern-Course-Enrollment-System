import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'
import courseCtrl from '../controllers/course.controller'

const router = express.Router()

router.route('/api/courses/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hashAuthorization, userCtrl.isEducator, courseCtrl.create)
    .get(authCtrl.requireSignin, authCtrl.hashAuthorization, courseCtrl.listByInstructor)

router.route('/api/courses/photo/:courseId')
    .get(courseCtrl.photo, courseCtrl.defaultPhoto)
router.route('/api/courses/defaultPhoto')
    .get(courseCtrl.defaultPhoto)

router.route('/api/courses/:courseId')
    .get(courseCtrl.read)

router.param('userId', userCtrl.userById)
router.param('courseId', courseCtrl.courseById)

export default router