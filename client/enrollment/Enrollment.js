import { Avatar, Divider, Drawer, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, makeStyles } from '@material-ui/core';
import { CheckCircle, Info, RadioButtonUnchecked } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import auth from '../auth/auth-helper';
import { complete, read } from './api-enrollment';

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
        maxWidth: 800,
        margin: 'auto',
        marginTop: theme.spacing(12),
        marginLeft: 250
      }),
      heading: {
        marginBottom: theme.spacing(3),
        fontWeight: 200
      },
  flex:{
    display:'flex',
    marginBottom: 20
  },
  card: {
    padding:'24px 40px 20px'
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
  avatar: {
    color: '#9b9b9b',
    border: '1px solid #bdbdbd',
    background: 'none'
  },
  media: {
    height: 180,
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
    margin: '8px 24px',
    display: 'inline-block'
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: '#616161'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  selectedDrawer: {
      backgroundColor: '#e9e3df'
  },
  unselected: {
      backgroundColor: '#ffffff'
  },
  check: {
      color:'#38cc38'
  },
  subhead: {
      fontSize: '1.2em'
  },
  progress: {
      textAlign: 'center',
      color: '#dfdfdf',
      '& span':{
        color: '#fffde7',
        fontSize: '1.15em'
      }
    },
  para: {
    whiteSpace: 'pre-wrap'
  }
}))

export default function Enrollment({match}) {
    const classes = useStyles()
    const [enrollment, setEnrollment] = useState({
        course: {instructor: []},
        lessonStatus: []
    });
    const [values, setValues] = useState({
        redirect: false,
        error: '',
        drawer: -1
    });
    const [totalComplete, setTotalComplete] = useState(0);
    const jwt = auth.isAuthenticated()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({enrollmentId: match.params.enrollmentId}, {t: jwt.token}, signal)
            .then((data) => {
                if (data && data.error) {
                    setValues({...values, error: data.error})
                } else {
                    setEnrollment(data)
                }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [match.params.enrollmentId]);

    const markComplete = () => {
      if (!enrollment.lessonStatus[values.drawer].complete) {
        const lessonStatus = enrollment.lessonStatus
        lessonStatus[values.drawer].complete = true
        let count = totalCompleted(lessonStatus)

        let updatedData = {}
        updatedData.lessonStatusId = lessonStatus[values.drawer]._id
        updatedData.complete = true
        if (count == lessonStatus.length) {
          updatedData.courseCompleted = Date.now()
        }
        complete({enrollmentId: match.params.enrollmentId}, {t: jwt.token}, updatedData)
          .then((data) => {
            if (data && data.error) {
              setValues({...values, error: data.error})
            } else {
              setEnrollment({...enrollment, lessonStatus: lessonStatus})
            }
          })
      }
    }

    const totalCompleted = (lessons) => {
      const reduce = (total, lessonStatus) => (total + (lessonStatus.complete? 1: 0))
      let count = lessons.reduce(reduce, 0)
      setTotalComplete(count)
      return count
    }

    const selectDrawer = (index) => event => {
        setValues({...values, drawer: index})
    }

    return (<div className={classes.root}>
        <Drawer variant="permanent">
            <div className={classes.toolbar}/>
            <List>
                <ListItem button onClick={selectDrawer(-1)} className={values.drawer == -1? classes.selectedDrawer : classes.unselected}>
                    <ListItemIcon><Info/></ListItemIcon>
                    <ListItemText primary={"Course Overview"}/>
                </ListItem>
            </List>
            <Divider/>
            <List>
                <ListSubheader component="div">
                    Lessons
                </ListSubheader>
                {enrollment.lessonStatus.map((lesson, index) => (
                    <ListItem button key={index} onClick={selectDrawer(index)} className={values.drawer == index? classes.selectedDrawer : classes.unselected}>
                        <ListItemAvatar>
                            <Avatar> {index + 1} </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={enrollment.course.lessons[index].title} />
                        <ListItemSecondaryAction> {lesson.complete? <CheckCircle/> : <RadioButtonUnchecked/>} </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </Drawer>
    </div>)
};
