import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import QrReader from 'react-qr-reader'
import Container from '@material-ui/core/Container';
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
  const [error,setError]=React.useState(false);
  const [msg,setMsg]=React.useState('');
  const [warn,setWarn]=React.useState(false);
  const [warining,setWarining]=React.useState('');
  const fromHandle=(e)=>{
    if(e==null){
      setWarn(true)
      setWarining(" Please place your QR code correctly..")
    }
    else{
      Axios({
        method:"POST",
        headers:{
          'Authorization':`Basic ${GetToken()}`
        },
        url:`${process.env.REACT_APP_URL}/productVerificationM`,
        data:{id:e},
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
  }
  return(
    <React.Fragment>
      <Container component="main" maxWidth="xs">
      <Typography><span style={{color:"red"}}>Note:</span>You can verify the product by scaning QR code of product. It is conforming that the product is verified from Warehouse Center.</Typography>
      <div className={classes.paper}>
      {
              warn?(<Alert severity="error">{warining}</Alert>):null
      }  
      <QrReader
          delay={3000}
          onError={()=>{setWarn(true);
            setWarining("Opps something went wrong try again")}}
          onScan={fromHandle}
          style={{ width: '100%' }}
        />
      </div>
      {
              error?(<Alert severity="error">{msg}</Alert>):null
            }
      </Container>
    </React.Fragment>
  )
}






{/* <form onSubmit={fromHandle}>
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
      </form> */}