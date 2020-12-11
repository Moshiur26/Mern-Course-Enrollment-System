import { Avatar, Card, CardHeader, CardMedia, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import auth from '../auth/auth-helper';
import {read} from './api-course';
import {Link} from 'react-router-dom';
import NewLesson from './NewLesson';

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 800,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(12)
      }),
  flex:{
    display:'flex',
    marginBottom: 20
  },
  card: {
    padding:'24px 40px 40px'
  },
  subheading: {
    margin: '10px',
    color: theme.palette.openTitle
  },
  details: {
    margin: '16px',
  },
  sub: {
    display: 'block',
    margin: '3px 0px 5px 0px',
    fontSize: '0.9em'
  },
  media: {
    height: 190,
    display: 'inline-block',
    width: '100%',
    marginLeft: '16px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  category:{
    color: '#5c5c5c',
    fontSize: '0.9em',
    padding: '3px 5px',
    backgroundColor: '#dbdbdb',
    borderRadius: '0.2em',
    marginTop: 5
  },
  action: {
    margin: '10px 0px',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  statSpan: {
    margin: '7px 10px 0 10px',
    alignItems: 'center',
    color: '#616161',
    display: 'inline-flex',
    '& svg': {
      marginRight: 10,
      color: '#b6ab9a'
    }
  },
  enroll:{
    float: 'right'
  }
}))

export default function Course({match}) {
    const classes = useStyles()
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
    const addLesson = (course) => {
      setCourse(course)
    }
    const imageUrl = course._id ? `/api/courses/photo/${course._id}?${new Date().getTime()}` : '/api/courses/defaultphoto'
    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardHeader
                    title={course.name}
                    subheader={<div>
                        <Link to={"/user/"+course.instructor._id} className={classes.sub}>
                                By {course.instructor.name}
                        </Link>
                        <span className={classes.category}>{course.category}</span>
                    </div>}
                />
                <CardMedia
                    image={imageUrl}
                    title={course.name}
                    className={classes.media}
                />
                <div>
                    <Typography variant="body1">
                        {course.description}
                    </Typography>
                </div>
                {auth.isAuthenticated().user && auth.isAuthenticated().user._id == course.instructor._id && 
                    <span>
                        <Link to={"/teach/course/edit/" + course._id} className={classes.sub}>
                            <IconButton aria-label="Edit" color="secondary">
                                <Edit/>
                            </IconButton>
                        </Link>
                    </span>
                }
                {auth.isAuthenticated().user && auth.isAuthenticated().user._id == course.instructor._id && !course.published && 
                  (<NewLesson courseId={course._id} addLesson={addLesson}/>)
                }
                <List>
                  {course.lessons && course.lessons.map((lesson, index) => (
                    <span key={index}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>{index + 1}</Avatar>
                        </ListItemAvatar>
                          <ListItemText primary={lesson.title}/>
                      </ListItem>
                    </span>
                  ))}
                </List>
            </Card>
        </div>
    )
};
