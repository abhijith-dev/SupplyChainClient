import React, { useState,useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Axios from 'axios';
import {GetToken} from '../../../../Auth/AuthToken';
import Alert from '@material-ui/lab/Alert';
import swal from 'sweetalert';
import PublishIcon from '@material-ui/icons/Publish';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [ecal,setECal]=useState(false);
  const [mcal,setMCal]=useState(false);
  const [name,setName]=useState('');
  const [desc,setDesc]=useState('');
  const [nut,setNut]=useState('');
  const [edate,setEdate]=useState('');
  const [mdate,setMdate]=useState('');
  const [prize,setPrize]=useState('');
  const [qua,setQua]=useState('');
  const [error,setError]=useState(false);
  const [msg,setMsg]=useState('');
  const [content,setContent]=useState(true);
  const [id,setID]=useState('');
  const [file,setFile]=useState('');
  const [ie,setIe]=useState(false);
  const [im,setIm]=useState('');
  const inputRef=useRef();
  const imageHandle=()=>{
    const data = new FormData() 
    data.append('file',file) ;
    Axios({
        method:"POST",
        headers:{
            'Authorization':`basic ${id}`
        },
        url:`${process.env.REACT_APP_URL}/addProductImage`,
        data:data
    }).then(res=>{
        if(res.data.flag===200){
            swal({
                title:`Product Added Successfully`,
                type:"success",
                show:"true",
                confirmButtonText:"OK",
                icon:"success"
              }).then(isOK=>isOK?window.location.href='/':null)
        }
        else{
          setIe(true);
          setIm(res.data.message)
        }
    }); 
  }
  const formSubmit=(e)=>{
     e.preventDefault();
     let data={
        Name:name,
        Disc:desc,
        Prize:prize,
        Nut:nut,
        MDate:mdate,
        EDate:edate,
        Quantity:qua,
     }
     Axios({
         method:"POST",
         headers:{
           'Authorization':`Basic ${GetToken()}`
         },
         url:`${process.env.REACT_APP_URL}/addFoodToDb`,
         data:data
     }).then(res=>{
         if(res.data.flag===200){
             setID(res.data.id)
             setContent(false)
         }
         else{
             setError(true);
             setMsg(res.data.message)
         }
     })
  }
  if(content){
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <FastfoodIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Product
            </Typography>
            <form className={classes.form} onSubmit={formSubmit} validate="true">  
              <Grid container spacing={2}>
              <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e)=>setName(e.target.value)}
                    color="secondary"
                    name="Name"
                    label="Product Name"
                    id="Name"
                    autoComplete="Name"
                  />
                </Grid> 
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    onChange={(e)=>setDesc(e.target.value)}
                    fullWidth
                    color="secondary"
                    id="desc"
                    label="Product Description"
                    name="desc"
                    autoComplete="desc"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e)=>setPrize(e.target.value)}
                    color="secondary"
                    id="prize"
                    label="Product Prize"
                    name="prize"
                    autoComplete="prize"
                  />
                </Grid> 
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e)=>setMdate(e.target.value)}
                    color="Secondary"
                    name="mdate"
                    type={mcal?"date":"text"}
                    onClick={()=>{setMCal(true)}}
                    label="Manufacture Date"
                    id="mdate"
                    autoComplete="mdate"
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e)=>setEdate(e.target.value)}
                    color="Secondary"
                    name="edate"
                    type={ecal?"date":"text"}
                    onClick={()=>{setECal(true)}}
                    label="Expire Date"
                    id="edate"
                    autoComplete="edate"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e)=>setNut(e.target.value)}
                    color="secondary"
                    id="nut"
                    label="Product Nutritions"
                    name="nut"
                    autoComplete="nut"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    color="secondary"
                    fullWidth
                    onChange={(e)=>setQua(e.target.value)}
                    name="qua"
                    label="Product Quantity"
                    id="qua"
                    autoComplete="qua"
                  />
                </Grid>
                {error?(<Alert severity="error">{msg}</Alert>):null}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Next
              </Button>
            </form>
          </div>
        </Container>
      );
  }
  else{
     return (
       <>
        <input type="file" style={{display:"none"}} ref={inputRef} onChange={(e)=>{setFile(e.target.files[0])}} required/>   
        <Paper className={classes.paper}>
            <Typography variant="h6">Upload Product Image</Typography>
        <PublishIcon titleAccess="Click Here to Upload" onClick={()=>{inputRef.current.click()}} style={{width:"100px",height:"100px"}} />  
        {
          file?(
            <div>  
            <Button
                onClick={imageHandle}
                variant="contained"
                color="secondary"
                className={classes.submit}
              >
                Upload
              </Button>
            </div>
          ):null
        }
        </Paper>
        {ie?(<Alert severity="error">{im}</Alert>):null}
       </>
       
      )
  }
}
