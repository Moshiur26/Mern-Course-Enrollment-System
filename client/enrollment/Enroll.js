import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import auth from '../auth/auth-helper';
import { create } from './api-enrollment';
import PropTypes from 'prop-types';

export default function Enroll(props) {
    const [values, setValues] = useState({
        enrollmentId: '',
        error: '',
        redirect: false
    });
    const clickEnroll = () => {
        const jwt = auth.isAuthenticated()
        create({ courseId: props.courseId}, { t: jwt.token })
            .then((data) => {
                if (data && data.error) {
                    setValues({...values, error: data.error})
                } else {
                    setValues({...values, enrollmentId: data._id, redirect: true})
                    console.log("created data: ", data);
                }
            })
    }
    if (values.redirect) {
        return (<Redirect to={'/learn/' + values.enrollmentId}/>)
    }
    return (
        <Button variant="contained" color="secondary" onClick={clickEnroll}>Enroll</Button>
    )
};
Enroll.porpTypes = {
    courseId: PropTypes.string.isRequired
}