import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
const labels = {
    1: 'Useless',
    2: 'Poor',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };
  
  const useStyles = makeStyles({
    root: {
      width: 200,
      display: 'flex',
      alignItems: 'center',
      textAlign:'center',
      alignContent:'center'
    }
  });
export default function Feedback({id}) {
    const [value, setValue] = React.useState(0);
    const [hover, setHover] = React.useState(-1);
    const [control,setControl]=React.useState(false);
    const classes = useStyles();
    const submitFeedback=()=>{
        let data={
            id:id,
            rate:value
        }
        Axios({
            url:`${process.env.REACT_APP_URL}/newRating`,
            method:"POST",
            data:data
        }).then(res=>{
           setControl(true)
        })
    }
    return (    
      <div>
          <div className={classes.root}>
      <Rating
        name="hover-feedback"
        disabled={control}
        value={value}
        precision={1}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        size="large"
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
      />
      &nbsp;&nbsp;
      {value !== null && <Typography ml={2}>{labels[hover !== -1 ? hover : value]}</Typography>}
      &nbsp;&nbsp;&nbsp;&nbsp;
      {control?(<Button size="small"  variant="contained"  color="secondary" >Done</Button>):(<Button size="small" variant="contained" onClick={()=>{submitFeedback()}} color="secondary">Submit</Button>)}
      </div> 
      
      </div>
        )
    }







