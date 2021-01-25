import React,{useState,useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Axios from 'axios';
import {GetToken} from '../../../../Auth/AuthToken';


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits({setCurrentpage}) {
  function preventDefault(event) {
    event.preventDefault();
    setCurrentpage(1)
  }
  const classes = useStyles();
  const [year,setYear]=useState('');
  const [count,setCount]=useState(0);
  useEffect(()=>{
    Axios({
      headers:{
        'Authorization':`basic ${GetToken()}`
      },
      method:"POST",
      url:`${process.env.REACT_APP_URL}/fetchfoodcount`,
    }).then(res=>{
      setCount(res.data)
    });
  
    Axios({
      headers:{
        'Authorization':`basic ${GetToken()}`
      },
      method:"POST",
      url:`${process.env.REACT_APP_URL}/fetchYear`,
    }).then(res=>{
      setYear(res.data);
    }); 
  },[])
  return (
    <React.Fragment>
      <Title>Varified Products</Title>
      <Typography component="p" variant="h4">
        00{count}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        since {year.split(" ")[2]} {year.split(" ")[1]} {year.split(" ")[3]}
      </Typography>
      <div>
        <Link color="primary" to="/" onClick={preventDefault}>
          More Details
        </Link>
      </div>
    </React.Fragment>
  );
}