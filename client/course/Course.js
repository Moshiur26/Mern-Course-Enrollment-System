import React, { useState, useEffect } from 'react';
import auth from '../auth/auth-helper';
import {read} from './api-course';

export default function Course({match}) {
    const [course, setCourse] = useState({instructor:{}});
    const [values, setValues] = useState({
        error: ''
    });
    const jwt = auth.isAuthenticated()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        read({ courseId: match.params.courseId}, { t: jwt.token }, signal)
            .then((data) => {
                if (data && data.error) {
                    console.log("Course: ", data.error);
                    setValues({...values, error: data.error})
                } else {
                    console.log("Data : ", data);
                    setCourse(data)
                }
            })
        return function cleanup() {
            abortController.abort()
        }
    }, [match.params.courseId]);

    return (
        <div>
            <h6>hello</h6>
        </div>
    )
};
