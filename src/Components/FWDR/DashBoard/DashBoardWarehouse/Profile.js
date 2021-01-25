import React,{useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import {GetToken} from '../../../../Auth/AuthToken';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
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

export default function Profile() {
  const classes = useStyles();
  const [name,setName]=React.useState('');
  const [email,setEmail]=React.useState('');
  const [phno,setPhno]=React.useState('');
  const [loc,setLoc]=React.useState('');
  const [address,setAddress]=React.useState('');
  const [type,setType]=React.useState('');
  const [date,setDate]=React.useState('');
  useEffect(()=>{
     Axios({
         url:`${process.env.REACT_APP_URL}/profile`,
         method:"POST",
         headers:{
             'Authorization':`basic ${GetToken()}`
         }
     }).then(res=>{
         setName(res.data[0].Name);
         setEmail(res.data[0].Email);
         setPhno(res.data[0].Phno);
         setLoc(res.data[0].Location);
         setAddress(res.data[0].Address);
         setType("WareHouse")
         setDate(res.data[0].Date);
     })
  },[])
  return (
    <Container component="main" maxWidth="xs">
      <Typography><span style={{color:"red"}}>Note:</span>You Can't edit or delete your details because of smart supply chain terms and conditions read <a href="http://127.0.0.1:5500/termsandconditons">terms & conditions</a></Typography>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <span style={{textTransform:"uppercase"}} >{name[0]}</span>
        </Avatar>
        <Typography component="h1" variant="h5">
          My Profile
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                color="secondary"
                fullWidth
                value={name}
                id="Name"
                label="Name"
                inputProps={{"aria-readonly":true}}
             
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                color="secondary"
                fullWidth
                value={email}
                id="email"
                label="Email"
                inputProps={{"aria-readonly":true}}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="phno"
                name="phno"
                variant="outlined"
                color="secondary"
                fullWidth
                value={phno}
                id="phno"
                label="Phone Number"
                inputProps={{"aria-readonly":true}}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="loc"
                name="loc"
                variant="outlined"
                color="secondary"
                fullWidth
                value={loc}
                id="Name"
                label="Location"
                inputProps={{"aria-readonly":true}}
                
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                autoComplete="address"
                name="address"
                variant="outlined"
                color="secondary"
                fullWidth
                value={address}
                id="address"
                label="Address"
                inputProps={{"aria-readonly":true}}
               
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="type"
                name="type"
                variant="outlined"
                color="secondary"
                fullWidth
                value={type}
                id="type"
                label="Type"
                inputProps={{"aria-readonly":true}}
                
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                autoComplete="date"
                name="date"
                variant="outlined"
                color="secondary"
                fullWidth
                value={date}
                id="date"
                label="Date"
                inputProps={{"aria-readonly":true}}
                
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}