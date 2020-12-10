import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-type';
import auth from '../auth/auth-helper';
import { newLesson } from './api-course';

export default function NewLesson(props) {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
       title: '',
       content: '',
       resource_url: '' 
    });
    const jwt = auth.isAuthenticated()
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const clickSubmit = () => {
        const lesson = {
            title: values.title || undefined,
            content: values.content || undefined,
            resource_url: values.resource_url || undefined
        } 
        newLesson({ courseId: props.courseId }, { t: jwt.token }, lesson)
            .then((data) => {
                if (data && data.error) {
                    setValues({...values, error: data.error})
                } else {
                    props.addLesson(data)
                    setValues({
                        ...values, 
                        title: '',
                        content: '',
                        resource_url: ''
                    })
                    setOpen(false)
                }
            })
    }
    return (<div>
        
    </div>)

};
NewLesson.propType = {
    courseId: PropTypes.string.isRequired,
    addLesson: PropTypes.func.isRequired,
}
