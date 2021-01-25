import React from 'react'; 
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { GetToken } from '../../../../Auth/AuthToken';
import Typography from '@material-ui/core/Typography';
import { Alert } from '@material-ui/lab';
import swal from 'sweetalert';
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
    marginLeft:"7rem"
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [id,setId]=React.useState('');
  const [error,setError]=React.useState(false);
  const [msg,setMsg]=React.useState('');
  const fromHandle=(e)=>{
    e.preventDefault();
    Axios({
      method:"POST",
      headers:{
        'Authorization':`Basic ${GetToken()}`
      },
      url:`${process.env.REACT_APP_URL}/productVerificationM`,
      data:{id:id},
    }).then(res=>{
      if(res.data.flag===200){
        swal({
          title:`Product is verified Successfully`,
          type:"success",
          show:"true",
          confirmButtonText:"OK",
          icon:"success"
        }).then(isOK=>isOK?window.location.href='/':null)
      }
      else{
        setError(true);
        setMsg(res.data.message)
      }
    })
  }
  return(
    <React.Fragment>
      <Container component="main" maxWidth="xs">
      <Typography><span style={{color:"red"}}>Note:</span>You can verify the product by entering product id. It is conforming that the product is verified from Distributor Center.</Typography>
      <div className={classes.paper}>
      <form onSubmit={fromHandle}>
      <TextField
              variant="outlined"
              margin="normal"
              color="secondary"
              onChange={(e)=>{setId(e.target.value)}}
              required
              fullWidth
              name="password"
              type="text"
              id="p_id"
              autoComplete="P_ID"
            />
            
      <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Verify Product
            </Button>      
      </form>
      </div>
      {
              error?(<Alert severity="error">{msg}</Alert>):null
            }
      </Container>
    </React.Fragment>
  )
}
