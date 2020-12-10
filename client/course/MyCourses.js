import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import auth from '../auth/auth-helper';
import { listByInstructor } from './api-course';
import {Link} from 'react-router-dom';

export default function MyCourses() {
    const [courses, setCourses] = useState([]);
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listByInstructor({userId: jwt.user._id}, {t: jwt.token}, signal)
            .then((data) => {
                if (data && data.error) {
                    setRedirectToSignin(true)
                } else {
                    setCourses(data)
                    // console.log("MyCourse list by user: ", data);
                }
            })
        return function cleanUp() {
            abortController.abort()
        }
    }, []);

    if (redirectToSignin) {
        return <Redirect to="/signin/"/>
    }
    return (
        <div>
            <List dense>
                <Link to="/teach/course/new">
                    <ListItem button>Create New</ListItem>
                </Link>
                {
                    courses.map((course, i) => {
                        return (<Link to={"/teach/course/" + course._id} key={i}>
                            <ListItem button>
                                <ListItemAvatar>
                                    {/* <Avatar src={'/api/courses/photo/' + course._id + "?" + new Date().getTime()}/> */}
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText primary={course.name} secondary={course.description}/>
                            </ListItem>
                        </Link>)
                    })
                }
            </List>
        </div>
    )
};
