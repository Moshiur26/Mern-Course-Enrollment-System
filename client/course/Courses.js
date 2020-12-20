import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    title: {
      padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    },
    media: {
      minHeight: 400
    },
    gridList: {
      width: '100%',
      minHeight: 200,
      padding: '16px 0 0px'
    },
    tile: {
      textAlign: 'center',
      border: '1px solid #cecece',
      backgroundColor:'#04040c'
    },
    image: {
      height: '100%'
    },
    tileBar: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      textAlign: 'left'
    },
    tileTitle: {
      fontSize:'1.1em',
      marginBottom:'5px',
      color:'#fffde7',
      display:'block'
    },
    action:{
      margin: '0 10px'
    }
  }))
  
export default function Courses(props) {
    const classes = useStyles()
      // <div><h6>Hello</h6></div>
      return (
        props.courses.map((course, i) => {
          return (
            <h2 key={i}>{course.name}</h2>
          )
        })
      )
};

Courses.propTypes = {
    courses: PropTypes.array.isRequired
}