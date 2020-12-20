import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import homeImg from './../assets/images/home_1.jpg'
import { listPublished } from '../course/api-course'
import Courses from '../course/courses'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle
  },
  media: {
    minHeight: 400
  }
}))

export default function Home(){
  const classes = useStyles()
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listPublished(signal)
      .then((data) => {
        if (data && data.error) {
          console.log("Home page List published error: ", data.error);
        } else {
          console.log("published list", data);
          setCourses(data)
        }
      })
      return function cleanup () {
        abortController.abort()
      }
  }, []);
    return (
        <Card className={classes.card}>
          <Typography variant="h6" className={classes.title}>
            Home Page
          </Typography>
          <CardMedia className={classes.media} image={homeImg} />
          <CardContent>
            <Courses courses={courses}/>
            {/* <Courses courses={courses}/> */}
            {/* <div>
              <Courses />
            </div> */}
            {/* <Typography variant="body1" component="p">
              Welcome to the MERN Skeleton home page.
            </Typography> */}
          </CardContent>
        </Card>
    )
}