import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Factory from '../../../../Images/img/f.svg';
import Warehouse from '../../../../Images/img/w.svg';
import Distributor from '../../../../Images/img/d.svg';
import Retailer from '../../../../Images/img/r.svg';
import Axios from 'axios';
import {GetToken} from '../../../../Auth/AuthToken';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(1),
    textAlign:"center",
    fontSize:"1.2rem"
  },
}));

function getSteps() {
  return [Factory,Warehouse,Distributor,Retailer];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Product still in Factory';
    case 1:
      return 'Your Product is Launched..till now not verified by Warehouse';
    case 2:
      return 'Product is Verified by WareHouse on the way to Distributor center. ';
    case 3:
      return 'Product is Varified by Distributor on the way to Retailer..';  
    default:
      return 'Your Product is out of your Control..';
  }
}

export default function Tracker({id,setShowTracker}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();
  useEffect(()=>{
    Axios({
      method:"POST",
      headers:{
         'Authorization':`basic ${GetToken()}`
      },
      url:`${process.env.REACT_APP_URL}/productDetailsbyId`,
      data:{id:id}
    })
    .then(res=>{
      if(res.data.length===0){
        setShowTracker(false);
      }
      else{
        if(res.data[0].W_sign==="Yes")setActiveStep(2);
        if(res.data[0].D_sign==="Yes")setActiveStep(3);
        if(res.data[0].R_sign==="Yes")setActiveStep(4);
      }
    })
  })
  return (
    <div className={classes.root}>
      <Stepper  activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step>
            <StepLabel><img src={label} style={{width:"80px",height:"80px"}} alt="factory" /></StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.container}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}><CheckCircleIcon />Congrats...Your Product is verfied by all it is in Market now..</Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
