import { Button, Card, CardActions, CardContent, Icon, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { AddPhotoAlternate } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import auth from '../auth/auth-helper';
import { create } from './api-course';
const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(12),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    },
    input: {
      display: 'none'
    },
    filename:{
      marginLeft:'10px'
    }
  }))
  

export default function NewCourse() {
    const classes = useStyles()
    const [values, setValues] = useState({
        name: '',
        description: '',
        image: '',
        category: '',
        error: '',
        redirect: false,
    });
    const jwt = auth.isAuthenticated()

    
    
    const handleChange = name => event => {
        const value = name === 'image'? event.target.files[0] : event.target.value
        setValues({ ...values, [name]: value })
    }
    
    const clickSubmit = () => {
        let courseData = new FormData()
        values.name && courseData.append('name', values.name)
        values.description && courseData.append('description', values.description)
        values.image && courseData.append('image', values.image)
        values.category && courseData.append('category', values.category)

        create({ userId: jwt.user._id }, { t: jwt.token }, courseData)
            .then((data) => {
                if (data && data.error) {
                    console.log("NewCourse error: ", data.error);
                    setValues({...values, error: data.error})
                } else {
                    console.log("NewCourse not get error: ");
                    setValues({...values, error: '', redirect: true})
                }
            })
        
    }

    if (values.redirect) {
        return (<Redirect to='/teach/course'/>)
    }
    
    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <input accept="image/*" id="icon-button-file" className={classes.input}  onChange={handleChange('image')} type="file" />
                    <label htmlFor="icon-button-file">
                        <Button variant="contained" color="secondary" component="span">
                            Upload Photo <AddPhotoAlternate/>
                        </Button>
                    </label>
                    <br/>
                    <span>{values.image ? values.image.name : ''}</span>
                    <br/>
                    <TextField id="name" label="Name"
                        className={classes.textField}
                        value={values.name} onChange={handleChange('name')}
                        margin="normal"
                    />
                    <TextField id="multiline-flexible" label="Description"
                        className={classes.textField}
                        multiline
                        rows="2"
                        value={values.description} 
                        onChange={handleChange('description')}
                    />
                    <TextField id="category" label="Category"
                        className={classes.textField} 
                        value={values.category} onChange={handleChange('category')}
                        margin="normal"
                    />
                    <br/>
                    <br/>
                    {
                        values.error && (
                        <Typography component="p" color="error" >
                            <Icon color="error" className={classes.error}>error</Icon>
                            {values.error}
                        </Typography>
                        )
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </Card>
            
        </div>
    )    
};