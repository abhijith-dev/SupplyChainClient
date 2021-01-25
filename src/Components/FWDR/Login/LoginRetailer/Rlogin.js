import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import Bg from '../../../../Images/img/retailer.jpg';
import Axios from 'axios';
import {SetToken} from '../../../../Auth/AuthToken';
import Alert from '@material-ui/lab/Alert';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/termsandcondition">
        Smart Supply Chain
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity:"1.5"
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Wlogin() {
  const {REACT_APP_URL}=process.env;
  const classes = useStyles();
  const [emailAddress,setEmailAddress]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState(false);
  const [msg,setMsg]=useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
    let data={
      email:emailAddress,
      password:password
    }
    Axios({
      method: 'post',
      url:`${REACT_APP_URL}/RetailerLogin`,
      data:data
    }).then(res=>{
       if(res.data.flag===200){
         SetToken(res.data.token);
         window.location.href="/";
       }
       else{
         setError(true);
         setMsg(res.data.message)
       }
    })
  }
  return (
    
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
          <div>
              <h1 style={{textAlign:"center",fontWeight:"900"}}>RETAILER</h1>
          </div>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Retailer Sign in  
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} validate={true}>
            <TextField
              variant="outlined"
              margin="normal"
              color="secondary"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setEmailAddress(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              color="secondary"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>{setPassword(e.target.value)}}
              aria-required
            />
            {
              error?(<Alert severity="error">{msg}</Alert>):null
            }
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign In
            </Button>
            
            <Grid container>
              <Grid item>
               <Link to="createRetailerAccount" >
                  {"Don't have an account? Sign Up"}
               </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}