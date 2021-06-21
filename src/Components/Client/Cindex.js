import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../../Images/Icons/Logo.png';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import '../Client/Main.css';
import ReactPlayer from 'react-player';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Home from './Home';
import d from '../../Images/img/distributer.jpg';
import f from '../../Images/img/factroy.jpg';
import r from '../../Images/img/retailer.jpg';
import w from '../../Images/img/warehouse.jpg';
import QrReader from 'react-qr-reader'
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    heading:{
      marginTop:25
    },
    button:{
      marginTop:30,
      marginLeft:205
    },
    player:{
      marginTop:20
    },
    rooter: {
      maxWidth: 300,
    },
    media: {
      height: 140,
    },
  }));
export default function Cindex() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [t,setT]=React.useState(0);
    const [id,setId]=React.useState("");
    const [warn,setWarn]=React.useState(false);
    const [warining,setWarining]=React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fromHandle=(e)=>{
     if(e===null){
       setWarn(true)
       setWarining("Please place your QR code correctly..")
     }
     else{
      setId(e)
      setT(1);
     }
     
  }
  if(t===0){
    return (
      <div style={{overflowX:"hidden"}}>
         <div className={classes.root}>
         <AppBar position="static" color="secondary">
           <Toolbar>
           <img src={Logo} alt="Logo" style={{width:"50px",height:"50px"}} />
         <Typography  variant="h6">
           <span className="name">Smart Supply Chain</span>
         </Typography>
             
           </Toolbar>
         </AppBar>
       </div>
       <main>
       <Container mt={5} maxWidth="sm">
       <img src={Logo} alt="Logo" className="roll " style={{width:"80px",height:"80px",marginLeft:"15rem",marginTop:"3rem"}} />
       <p className="content">
       A broad range of food production-distribution-consumption configurations can be characterised as food supply chain
       </p>
       <Button className={classes.button} onClick={handleClickOpen} variant="contained" color="secondary">Search Product</Button>
       <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
         <form>
         <DialogTitle id="form-dialog-title">Smart Supply Chain</DialogTitle>
         <DialogContent>
           <DialogContentText>
             To get the supply chain of product, please scan product QR code here. We will send supply
             of product if it is exist in our portal.
           </DialogContentText>
           {
              warn?(<Alert severity="error">{warining}</Alert>):null
           }  
         <QrReader
          delay={3000}
          onError={()=>{setWarn(true);
            setWarining("Opps something went wrong try again")}}
          onScan={fromHandle}
          style={{ width: '20rem',height:'20rem',marginLeft:'7rem' }}
        />
         </DialogContent>
         <DialogActions>
         <Button onClick={handleClose} variant="contained" color="secondary">
             Cancel
           </Button>
         </DialogActions>
         </form>
       </Dialog>
       <div className={classes.player}></div>
       </Container> 
       <ReactPlayer 
         style={{marginTop:"5rem",marginLeft:"10rem",borderRadius:"7px"}}
         playing={true} 
         muted={true} 
         width={1000}
         height={600}
         loop={true}
          url='https://www.youtube.com/watch?v=FqLxJywe9Uc' 
          controls={true}
          />  
       </main>
       <Grid container spacing={1} style={{margin:"1rem",marginTop:"3rem"}} mt={5} >
    <Grid item xs={12} sm={3}>
    <Card className={classes.rooter}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={f}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Factory
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          A factory or manufacturing plant is an industrial site, where workers manufacture goods  processing one product into another.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
    <Grid item xs={12} sm={3} >
    <Card className={classes.rooter}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={w}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Warehouse
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          A warehouse is a building for storing goods. Warehouses are used by manufacturers, importers, exporters, wholesalers, etc.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
    <Grid item xs={12} sm={3}>
    <Card className={classes.rooter}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={d}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Distributor Center
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          A distribution centers is a specialized building that's designed to store products for retailers and wholesalers.and integral part of the order fulfillment process.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
    <Grid item xs={12} sm={3}>
    <Card className={classes.rooter}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={r}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Retailer Center
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          When buyers buy a product and sell it to the final customers for their consumption, and not to any supplier or wholesaler, this is known as Retail.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
    </Grid>
    <hr />
    <div className="mt-5">
    <Paper className="m-3" style={{width:"95vw"}} color="default" elevation={3} />
    <p className="footer"><span>&copy;</span>2020-2021 <img src={Logo} alt="footer" style={{width:"20px",height:"20px"}}/> Smart Supply Chain. All rights reserved.</p>
    <Paper />
    </div>
      </div>
      
     );
  }  
  else{
     return(
       <Home id={id} />
     )
  }
}
