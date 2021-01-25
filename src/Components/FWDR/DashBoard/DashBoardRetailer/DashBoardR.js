import React, { useState,useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MainListItems from './listItems';
import Deposits from './Deposits';
import Orders from './Orders';
import Logo from '../../../../Images/Icons/Logo.png';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {RemoveToken} from '../../../../Auth/AuthToken';
import  Product from './Product';
import Profile from './Profile';
import Axios from 'axios';
import {GetToken} from '../../../../Auth/AuthToken';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/termsandcondition">
        Smart Supply Chain
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  opaper:{
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    height:'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  chartHeight:{
    height:420
  },
  openAdd:{
    marginTop:75+"px",
    marginLeft:+640+"px"
  },
  closeAdd:{
    marginTop:75+"px",
    marginLeft:770+"px"
  },
  chartopen:{
    textAlign:"center",
    opacity:"0.2",
    width:"350px",
    height:"350px",
    marginLeft:"320px",
    marginTop:"15px"
    },
    chartclose:{
      textAlign:"center",
      opacity:"0.2",
      width:"350px",
      height:"350px",
      marginLeft:"400px",
      marginTop:"15px"
      },
      trackopen:{
        textAlign:"center",
        opacity:"0.4",
        width:"350px",
        height:"350px",
        marginLeft:"320px",
        marginTop:"15px"
        },
      trackclose:{
          textAlign:"center",
          opacity:"0.4",
          width:"350px",
          height:"350px",
          marginLeft:"400px",
          marginTop:"15px"
    },
    checked:{
      fontWeight:100
    },
    nchecked:{
      fontWeight:"bolder"
    }
}));

export default function DashboardW() {
  const [currentpage,setCurrentpage]=React.useState(0)
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [NotificationsCount,setNotificationsCount]=useState(0);
  const [Notifications,setNotifications]=useState([]);
  const [name,setName]=useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [Nopen, setNOpen] = React.useState(false);
  useEffect(()=>{
    Axios({
      method:"POST",
      url:`${process.env.REACT_APP_URL}/profile`,
      headers:{
        'Authorization':`basic ${GetToken()}`
      }
    }).then(res=>{
      setName(res.data[0].Name)
    })
  },[])
  useEffect(()=>{
    Axios({
      url:`${process.env.REACT_APP_URL}/getNotifactions`,
      method:"POST",
      headers:{
        "Authorization":`basic ${GetToken()}`
      }
    }).then(res=>{
      let noti=[];
      let dt=res.data[0].messages;
      noti=dt.filter(d=>{
        if(d.checked==="false"){
          return d
        }
      })
      setNotifications(dt);
      setNotificationsCount(noti.length);
      
    })
  },[])
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setNOpen((prev)=>!prev);
  };
  const changePage=(page)=>{
     setCurrentpage(page)
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="default" position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <img src={Logo} style={{width:"40px",height:"40px"}} alt="Logo"/> 
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
           Smart Supply Chain [Retailer]
          </Typography>
          <Popper style={{zIndex:2147483638}} open={Nopen} anchorEl={anchorEl} placement={'left-end'} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper style={{width:"20rem",height:"20rem",marginRight:"1rem"}}>
              <Button color="secondary" fullWidth variant="contained">Notifications</Button>
              {
                Notifications.map(n=>(
                  <div id={n._id}>
                    <Button
                    style={{textTransform:"none"}} 
                    fullWidth
                     >
                      <span  className={n.checked==="true"?classes.checked:classes.nchecked}>{n.text}</span>
                      </Button>
                  </div>

                ))
              }
            </Paper>
          </Fade>
        )}
      </Popper >
          <IconButton style={{border:"none"}}  color="inherit" >
            <Badge badgeContent={NotificationsCount?NotificationsCount:null} color="secondary">
              <NotificationsIcon onClick={handleClick}/>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List><MainListItems changePage={changePage} currentpage={currentpage} /></List>
        <Divider />
      </Drawer>


        {
          currentpage===0?(
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
              <Typography style={{fontSize:"2rem"}}>Hello {name},</Typography>
              <Typography><br></br>Welcome to 'Smart Supply Chain'. press 'verify' button to verify the product of Smart supply Chain. </Typography>
                <Button variant="contained" color="secondary" onClick={()=>{setCurrentpage(3)}}  className={open?classes.openAdd:classes.closeAdd} >Verify</Button>
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits setCurrentpage={setCurrentpage} />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.opaper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
          ):(<>{
            currentpage===1?(
              <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Profile />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
            ):(<>{
              currentpage===2?(
                <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do You Really Want to Logout?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To verify product you should be logged in smart supply chain..
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setCurrentpage(0)}}  color="primary">
            No
          </Button>
          <Button onClick={()=>{
            RemoveToken();
            window.location.href="/"
          }}  color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
        </Dialog>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
        ):(<>{
                currentpage===3?(
                  <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Product />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
                ):(<>{
                  currentpage===4?(
                    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
        {/* null page */}
        </Container>
      </main>
                  ):(<>
                  {
                  currentpage===5?(
                    <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* null page */}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
                  ):null
                  }</>)
                }</>)
              }</>)
            }</>)
          }</>)
        }
    </div>
  );
}