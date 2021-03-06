import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import PrivateRoute from './auth/PrivateRoute'
import Signin from './auth/Signin'
import Profile from './user/Profile';
import EditProfile from './user/EditProfile';
import NewCourse from './course/NewCourse';
import MyCourses from './course/MyCourses';
import Course from './course/Course';
import EditCourse from './course/EditCourse';
import Enrollment from './enrollment/Enrollment';
import Menu from './core/Menu';
const MainRouter = () => {
    return (<div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/users" component={Users}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/signin" component={Signin}/>
        <Route path="/user/edit/:userId" component={EditProfile}/>
        <Route path="/user/:userId" component={Profile}/>

        <PrivateRoute path="/teach/course/new" component={NewCourse}/>
        <PrivateRoute path="/teach/course/edit/:courseId" component={EditCourse}/>
        <PrivateRoute path="/teach/course/:courseId" component={Course}/>
        <PrivateRoute path="/learn/:enrollmentId" component={Enrollment}/>

        <PrivateRoute path="/teach/courses" component={MyCourses}/>

        
      </Switch>
    </div>)
}

export default MainRouter