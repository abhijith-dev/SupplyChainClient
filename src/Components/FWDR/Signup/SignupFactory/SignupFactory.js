import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../SignupFactory/SignupFactory.css';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert';
import Axios from 'axios';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/termsandcondition">
        smart supply chain 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container:{
    width:"65%",
    height:"auto",
    marginLeft:"250px"
  }
}));

export default function SignupFactory() {
const classes = useStyles();
  const [ssl,setSSL]=useState('')
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [phno,setPhno]=useState('');
  const [loc,setLoc]=useState('');
  const [address,setAddress]=useState('');
  const [type,setType]=useState('');
  const [password,setPassword]=useState('');
  const [owner,setOwner]=useState('');
  const [cpassword,setCpassword]=useState('');
  const [tsc,setTsc]=useState(false);
  const [error,setError]=useState(false);
  const [msg,setMsg]=useState('');
  const formHandler=(e)=>{
    e.preventDefault();
    Axios({
      method:'POST',
      url:`${process.env.REACT_APP_URL}/sslverify`,
      data:{ssl:ssl}
    })
    .then(res=>{
      if(res.data.message==="Verified"){
        if(password===cpassword){
          if(tsc){
            let data={
              name:name,
              email:email,
              password:password,
              owner:owner,
              type:type,
              address:address,
              location:loc,
              phno:phno
            }
            Axios({
              method:"POST",
              url:`${process.env.REACT_APP_URL}/addFactoryToDb`,
              data:data
            }).then(res=>{
              if(res.data.flag===200){
                let temp=name;
                setName('');setEmail('');setLoc('');setSSL('');setTsc('');setType('');setAddress('');setPhno('');
                setOwner('');setPassword('');setCpassword('');setError(false);setMsg('');
                swal({
                  title:`Factoy '${temp}' Registered Successfully`,
                  text:"login now to connect with SMART SUPPLY CHAIN",
                  type:"success",
                  show:"true",
                  confirmButtonText:"OK",
                  icon:"success"
                }).then(isOK=>isOK?window.location.href='/auth':null)
              }
              else{
                setError(true);
                setMsg(res.data.message)
              }
            })
          }
          else{
            setError(true);
            setMsg("Accept terms and conditons to continue.")
          }
        }
        else{
          setError(true);
          setMsg("Passsword Missmatch")
        }
      }
      else{
        setError(true);
        setMsg("Invalid SSL code")
      }
    })
  }
  return (
    <div className="screen1">
     <Paper className={classes.container} elevation="3">
     <Container  component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Factory Signup
        </Typography>
        <form className={classes.form} onSubmit={formHandler} validate="true">
        <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            value={ssl}
            onChange={(e)=>{setSSL(e.target.value)}}
            id="ssl"
            label="SSL Code"
            type="password"
            name="ssl"
            autoComplete="ssl"
            autoFocus
          />  
          <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            id="name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            label="Factory Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
        <FormControl style={{marginTop:"10px"}} fullWidth color="secondary" required variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Factory Type</InputLabel>
          <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          label="Factory Type"
          value={type}
          onChange={(e)=>{setType(e.target.value)}}
          >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Bekary Foods"}>Bekary Foods</MenuItem>
          <MenuItem value={"Jaggery Foods"}>Jaggery Foods</MenuItem>
          <MenuItem value={30}>Grosary</MenuItem>
        </Select>
        </FormControl>

          <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            id="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            label="Factory Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            value={phno}
            onChange={(e)=>{setPhno(e.target.value)}}
            required
            fullWidth
            id="phno"
            label="Factory PhoneNumber"
            inputProps={{pattern:"[6-9]{1}[0-9]{9}"}}
            name="phno"
            autoComplete="phno"
            autoFocus
          />
      <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            value={loc}
            onChange={(e)=>{setLoc(e.target.value)}}
            id="loc"
            label="Factory Location"
            name="Location"
            autoComplete="loc"
            autoFocus
          />   
      <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            id="address"
            value={address}
            onChange={(e)=>{setAddress(e.target.value)}}
            label="Factory Address"
            name="address"
            autoComplete="address"
            autoFocus
          />
          <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            value={owner}
            onChange={(e)=>{setOwner(e.target.value)}}
            id="owner"
            label="Factory OwnerName"
            name="owner"
            autoComplete="owner"
            autoFocus
          />
        
          <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            label="Password"
            inputProps={{pattern:"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"}}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            value={cpassword}
            onChange={(e)=>{setCpassword(e.target.value)}}
            required
            fullWidth
            name="cpassword"
            label="Confirm Password"
            type="password"
            id="cpassword"
            autoComplete="current-password"
          />
          <FormControlLabel
            
            control={<Checkbox 
              checked={tsc}  
              onChange={()=>{
                if(tsc){
                  setTsc(false)
                }
                else{
                  setTsc(true)
                }
              }} 
              color="secondary" 
              />}
            label="Accept All term and coditions"
          />
          {error?(<Alert severity="error">{msg}</Alert>):null}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container>
            
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
     </Paper>
    </div>
  );
}
