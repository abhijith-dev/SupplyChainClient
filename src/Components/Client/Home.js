import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import Map from './Map';
import Feedback from './Feedback';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography,Container,Button,Box,Link} from '@material-ui/core';
import Title from '../FWDR/DashBoard/DashBoardFactory/Title';
import Factory from '../../Images/img/f.svg';
import Warehouse from '../../Images/img/w.svg';
import Distributor from '../../Images/img/d.svg';
import Retailer from '../../Images/img/r.svg';
import Time from '../../Images/img/t.svg';
import RoomIcon from '@material-ui/icons/Room';
import Nodata from './Nodata';
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
    heading:{
        color:"purple",
        fontWeight:500
    },
    Paper:{
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
  }));
export default function Home({id}) {
    const classes = useStyles();
    const [productdata,setProductdata]=useState([]);
    const [factorydata,setFactorydata]=useState([]);
    const [warehousedata,setWarehousedata]=useState([]);
    const [distributordata,setDistributordata]=useState([]);
    const [retailerdata,setRetailerdata]=useState([]);
    const [shift,setShift]=useState(0);
    const [nill,setNill]=useState(1);
    const [t1,setT1]=useState('');
    const [t2,setT2]=useState('');
    const [t3,setT3]=useState('');
    const [days,setDays]=useState('')
    const DateTracker1=(d1,d2,t1,t2)=>{
        Axios({
            url:`${process.env.REACT_APP_URL}/dateTracker`,
            method:"POST",
            data:{
                d1:d1,
                d2:d2,
                t1:t1,
                t2:t2
            }
        })
        .then(res=>{setT1(res.data)})
    }
    const DateTracker2=(d1,d2,t1,t2)=>{
        Axios({
            url:`${process.env.REACT_APP_URL}/dateTracker`,
            method:"POST",
            data:{
                d1:d1,
                d2:d2,
                t1:t1,
                t2:t2
            }
        })
        .then(res=>{setT2(res.data)})
    }
    const DateTracker3=(d1,d2,t1,t2)=>{
        Axios({
            url:`${process.env.REACT_APP_URL}/dateTracker`,
            method:"POST",
            data:{
                d1:d1,
                d2:d2,
                t1:t1,
                t2:t2
            }
        })
        .then(res=>{setT3(res.data)})
    }
    const DateTracker4=(d1,d2,t1,t2)=>{
        Axios({
            url:`${process.env.REACT_APP_URL}/dateTracker`,
            method:"POST",
            data:{
                d1:d1,
                d2:d2,
                t1:t1,
                t2:t2
            }
        })
        .then(res=>{
            if((res.data).startsWith('-')){

                setDays(`Product is Expried.`)
            }
            else{
                setDays(res.data)
            }
        })
    }
    const strdate=(date)=>{
       let  month=''
        let darr=date.split("-");
        if(darr[1].toString()==='01'){month='Jan'};
        if(darr[1].toString()==='02'){month='Feb'};
        if(darr[1].toString()==='03'){month='Mar'};
        if(darr[1].toString()==='04'){month='Apr'};
        if(darr[1].toString()==='05'){month='May'};
        if(darr[1].toString()==='06'){month='Jun'};
        if(darr[1].toString()==='07'){month='Jul'};
        if(darr[1].toString()==='08'){month='Aug'};
        if(darr[1].toString()==='09'){month='Sep'};
        if(darr[1].toString()==='10'){month='Oct'};
        if(darr[1].toString()==='11'){month='Nov'};
        if(darr[1].toString()==='12'){month='Dec'};
        return `null ${month} ${darr[2]} ${darr[0]}`;

    }
    useEffect(()=>{
                Axios({
                    method:"POST",
                    url:"http://127.0.0.1:3005/api/PrductTracking",
                    data:{product_id:id}
                }).then(res=>{
                    if(res.data.flag===200){
                    let date=new Date();    
                    setProductdata(res.data.details[0])
                    setFactorydata(res.data.details[1])
                    setWarehousedata(res.data.details[2])
                    setDistributordata(res.data.details[3])
                    setRetailerdata(res.data.details[4])
                    DateTracker1(res.data.details[0][0].Date,res.data.details[0][0].WV_date,res.data.details[0][0].Time,res.data.details[0][0].WV_time);
                    DateTracker2(res.data.details[0][0].WV_date,res.data.details[0][0].DV_date,res.data.details[0][0].WV_time,res.data.details[0][0].DV_time);
                    DateTracker3(res.data.details[0][0].DV_date,res.data.details[0][0].RV_date,res.data.details[0][0].DV_time,res.data.details[0][0].RV_time);
                    DateTracker4(date.toDateString(),strdate(res.data.details[0][0].EDate),date.toTimeString(),date.toTimeString());
                    }
                    else{
                       setNill(0);
                    }
                })
            
    },[])
    if(factorydata===[] || warehousedata===[] || distributordata===[] || retailerdata===[] || productdata===[]  || nill===0 ){
        return(
            <Nodata />
        )
    }
    else{
        if(shift===0){
            return(
                <div>
                        <h1 style={{textAlign:"center"}}></h1>
                        {
                            productdata.map(product=>(
                              <Container>
                                   <Paper className={classes.Paper} elevation={3}>
                                       <Title>PRODUCT DETAILS</Title>
                                   <img src={product.Img} style={{width:"100px",height:"100px"}} alt="product thumbmail" />    
                                   <Typography><span className={classes.heading}>Product Id :</span>  {product.F_id}</Typography>
                                   <Typography><span className={classes.heading}>Product Name :</span>  {product.Name}</Typography>
                                   <Typography><span className={classes.heading}>Product Description : </span>{product.Disc}</Typography>
                                   <Typography><span className={classes.heading}>Product Prize :</span> {product.Prize} (INR) Per {product.Quantity} </Typography>
                                   <Typography><span className={classes.heading}>Product Nutrition :</span> {product.Nut}</Typography>
                                   <Typography><span className={classes.heading}>Product Manufacture Date :</span> {product.MDate}</Typography>
                                   <Typography><span className={classes.heading}>Product Expire Date : </span>{product.EDate}</Typography>
                                   <Typography><span className={classes.heading}>Product Added Date : </span>{product.Date}</Typography>
                                   <Typography><span className={classes.heading}>Product Added Time :</span> {product.Time}</Typography>
                                   <br></br>
                                   </Paper>
                              </Container>
                            ))
                        }
                        {
                            factorydata.map(factory=>(
                            <Container>
                                <Paper className={classes.Paper} elevation={3} >
                                <Title>FACTORY DETAILS</Title>
                                <img src={Factory} style={{width:"100px",height:"100px"}} alt="product thumbmail" />    
                                <Typography><span className={classes.heading}>Factory Name</span> : {factory.Name}</Typography>
                                <Typography><span className={classes.heading}>Factory Email :</span> {factory.Email}</Typography>
                                <Typography><span className={classes.heading}>Factory Phone Number :</span> {factory.Phno} </Typography>
                                <Typography><span className={classes.heading}>Factory Location :</span> {factory.Location}</Typography>
                                <Typography><span className={classes.heading}>Factory Owner Name:</span> {factory.Owner}</Typography>
                                <Typography><span className={classes.heading}>Factory Address : </span>{factory.Address}</Typography>
                                <Typography><span className={classes.heading}>Factory Type :</span> {factory.Type}</Typography>
                                <Typography><span className={classes.heading}>Factory Added Date :</span> {factory.Date}</Typography>
                                <br></br>
                                </Paper>
                           </Container>
                            ))
                        }
                        {
                            warehousedata.map(data=>(
                            <Container>
                                <Paper className={classes.Paper} elevation={3} >
                                <Title>WAREHOUSE DETAILS</Title>
                                <img src={Warehouse} style={{width:"100px",height:"100px"}} alt="product thumbmail" />    
                                <Typography><span className={classes.heading}>WareHouse Name :</span> {data.Name}</Typography>
                                <Typography><span className={classes.heading}>WareHouse Email :</span> {data.Email}</Typography>
                                <Typography><span className={classes.heading}>WareHouse Phone Number :</span> {data.Phno} </Typography>
                                <Typography><span className={classes.heading}>WareHouse Location :</span> {data.Location}</Typography>
                                <Typography><span className={classes.heading}>WareHouse Owner Name:</span> {data.Owner}</Typography>
                                <Typography><span className={classes.heading}>WareHouse Address : </span>{data.Address}</Typography>
                                <Typography><span className={classes.heading}>WareHouse Added Date :</span> {data.Date}</Typography>
                                <br></br>
                                </Paper>
                           </Container>
                            ))
                        }
                        {
                            distributordata.map(data=>(
                            <Container>
                                <Paper className={classes.Paper} elevation={3} >
                                <Title>DISTRIBUTOR DETAILS</Title>
                                <img src={Distributor} style={{width:"100px",height:"100px"}} alt="product thumbmail" />        
                                <Typography><span className={classes.heading}>Distributor Name :</span> {data.Name}</Typography>
                                <Typography><span className={classes.heading}>Distributor Email :</span> {data.Email}</Typography>
                                <Typography><span className={classes.heading}>Distributor Phone Number :</span> {data.Phno} </Typography>
                                <Typography><span className={classes.heading}>Distributor Location :</span> {data.Location}</Typography>
                                <Typography><span className={classes.heading}>Distributor Owner Name:</span> {data.Owner}</Typography>
                                <Typography><span className={classes.heading}>Distributor Address :</span> {data.Address}</Typography>
                                <Typography><span className={classes.heading}>Distributor Added Date :</span> {data.Date}</Typography>
                                <br></br>
                                </Paper>
                           </Container>
                            ))
                        }
                        {
                            retailerdata.map(data=>(
                            <Container>
                                <Paper className={classes.Paper} elevation={3} >
                                <Title>RETAILER DETAILS</Title>
                                <img src={Retailer} style={{width:"100px",height:"100px"}} alt="product thumbmail" />    
                                <Typography><span className={classes.heading}>Retailer Name : </span>{data.Name}</Typography>
                                <Typography><span className={classes.heading}>Retailer Email :</span> {data.Email}</Typography>
                                <Typography><span className={classes.heading}>Retailer Phone Number :</span> {data.Phno} </Typography>
                                <Typography><span className={classes.heading}>Retailer Location : </span>{data.Location}</Typography>
                                <Typography><span className={classes.heading}>Retailer Owner Name: </span>{data.Owner}</Typography>
                                <Typography><span className={classes.heading}>Retailer Address :</span> {data.Address}</Typography>
                                <Typography><span className={classes.heading}>Retailer Added Date :</span> {data.Date}</Typography>
                                <br></br>
                                </Paper>
                           </Container>
                            ))
                        }
                        <Container>
                        <Paper className={classes.Paper} elevation={3}>
                        <Title>OTHER DETAILS</Title> 
                        <img src={Time} style={{width:"100px",height:"100px"}} alt="product thumbmail" />      
                        <Typography><span className={classes.heading}>Time taken to move product  from factory to warehouse:</span> {t1}</Typography>
                        <Typography ><span className={classes.heading}>Time taken to move product from warehouse to distributor : </span> {t2}</Typography>
                        <Typography ><span className={classes.heading}>Time taken to move product  from distributor to retailer :</span> {t3}</Typography>
                        <Typography><span className={classes.heading}>Days left to Use this Product : </span> {days}</Typography>
                        <br></br>
                        <Button variant="contained" color="secondary" onClick={()=>{setShift(1)}} ><RoomIcon /> Get Map</Button>
                        <br></br>
                        </Paper>
                        </Container>
                    <Container>
                    <Paper className={classes.Paper} elevation={3}>
                    <br></br>
                    <Title>PRODUCT REVIEW</Title>
                        <Typography>Give the starts for this product, 5 is best and 1 is least </Typography>
                        <br></br>
                    <Feedback id={id} />
                    <br></br>
                    </Paper>
                    </Container>
                    <Box mt={5}>
                     <Copyright />
                     </Box>
                </div>
            )

        }
        else{
            return(
                <Map
                id={id}
                setShift={setShift}
                 />
            )
        }
    }
}
