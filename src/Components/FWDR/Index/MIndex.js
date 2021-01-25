import React from 'react';
import {Link} from 'react-router-dom'
import {AppBar,Toolbar,IconButton,Typography,Button,Paper,Container} from  '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Logo from '../../../Images/Icons/Logo.png';
import Grid from '@material-ui/core/Grid'
import '../Index/MIndex.css';
import Carousel from 'react-material-ui-carousel';
import c1 from '../../../Images/img/c1.jpg';
import c2 from '../../../Images/img/c2.jpg';
import c3 from '../../../Images/img/c3.jpg';
import d from '../../../Images/img/distributer.jpg';
import f from '../../../Images/img/factroy.jpg';
import r from '../../../Images/img/retailer.jpg';
import w from '../../../Images/img/warehouse.jpg';
const useStyles = makeStyles({
    root: {
      maxWidth: 300,
    },
    media: {
      height: 140,
    },
  });
export default function MIndex() {
    const classes = useStyles();
    const items = [
        {
            img:c1,
        },
        {
            img: c2,
        },
        {
            img: c3,
        }
    ]
function Item(props)
{
    return (
        <Paper style={{height:"85vh"}} elevation={5}>
            <img className="c-img" alt="cal" src={props.item.img} />
        </Paper>
    )
}
    return (
        <div className="main">
         <AppBar color="default" position="fixed">
          <Toolbar>
           <IconButton edge="start" color="inherit" aria-label="menu">
           
    </IconButton>
    <img src={Logo} alt="Logo" style={{width:"50px",height:"50px"}} />
    <Typography  variant="h6">
     <span className="name">Smart Supply Chain</span>
    </Typography>
    <div className="buttons">
    <Link style={{textDecoration:"none"}} to="auth"><Button  variant="contained" color="secondary">Login</Button></Link>
    </div>
  </Toolbar>
  </AppBar>
  <Carousel autoPlay={true} className="mt-5">
    {
     items.map( (item, i) => <Item key={i} item={item} /> )
    }
  </Carousel>
  <Container mt={5} maxWidth="sm">
      <h1 className="heading">Smart Supply Chain</h1>
      <p className="content">
      The processe of “production,” “processing,” “distribution” and 
      “consumption.” 
      </p>
  </Container>   
  <Grid container spacing={1} style={{margin:"1rem",marginTop:"2rem"}} mt={5} >
    <Grid item xs={12} sm={3}>
    <Card className={classes.root}>
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
    <Card className={classes.root}>
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
    <Card className={classes.root}>
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
    <Card className={classes.root}>
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
    )
}
