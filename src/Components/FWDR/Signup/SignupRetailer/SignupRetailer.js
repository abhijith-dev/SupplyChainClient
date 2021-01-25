import React,{useState,useEffect} from 'react';
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
import '../SignupRetailer/SignupRetailer.css';
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

export default function SignupDistributor() {
const classes = useStyles();
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [phno,setPhno]=useState('');
  const [loc,setLoc]=useState('');
  const [address,setAddress]=useState('');
  const [password,setPassword]=useState('');
  const [owner,setOwner]=useState('');
  const [cpassword,setCpassword]=useState('');
  const [tsc,setTsc]=useState(false);
  const [error,setError]=useState(false);
  const [msg,setMsg]=useState('');
  const [id,setID]=useState('');
  const [cname,setCName]=useState('')
  useEffect(()=>{
     if(id.length===8){
         Axios({
             method:"POST",
             url:`${process.env.REACT_APP_URL}/rfechcom`,
             data:{key:id}
         }).then(res=>setCName(res.data))
     }
  },[id])
  const formHandler=(e)=>{
    e.preventDefault();
    if(cname===''){
      setError(true);
      setMsg("Valid Retailer_Id Autofill Company Name may be Retailer_id is Wrong..")
    }
    else{ 
      if(password===cpassword){
        if(tsc){
          let data={
            name:name,
            email:email,
            password:password,
            owner:owner,
            address:address,
            location:loc,
            phno:phno,
            retailer_key:id,
            src:cname
          }
          Axios({
            method:"POST",
            url:`${process.env.REACT_APP_URL}/addRetailerToDb`,
            data:data
          }).then(res=>{
            if(res.data.flag===200){
              let temp=name;
              setName('');setEmail('');setID('');setCName();setLoc('');setTsc('');setAddress('');setPhno('');
              setOwner('');setPassword('');setCpassword('');setError(false);setMsg('');
              swal({
                title:`Retailer '${temp}' Registered Successfully`,
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
  }
  return (
    <div className="screen4">
     <Paper className={classes.container} elevation="3">
     <Container  component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Retailer Signup
        </Typography>
        <form className={classes.form} onSubmit={formHandler} validate="true"> 
        <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            id="name"
            value={id}
            onChange={(e)=>{setID(e.target.value)}}
            label="Retailer ID"
            name="id"
            autoComplete="id"
            autoFocus
            inputProps={{maxlength:8}}
          />
          <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            id="name"
            value={cname}
            onChange={(e)=>{setCName(e.target.value)}}
            label="Company Name"
            inputProps={{readOnly:true}}
            name="cname"
            autoComplete="cname"
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
            label="Retailer Name"
            name="name"
            autoComplete="name"
            autoFocus
          />

          <TextField
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            id="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            label="Retailer Email Address"
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
            label="Retailer PhoneNumber"
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
            label="Retailer Location"
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
            label="Retailer Address"
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
            label="Retailer HolderName"
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
