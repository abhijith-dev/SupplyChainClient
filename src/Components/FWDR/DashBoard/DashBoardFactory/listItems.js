import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import BarChartIcon from '@material-ui/icons/BarChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AssignmentIcon from '@material-ui/icons/Assignment';
export default function MainListItems({changePage,currentpage}){
  return (
    <div>
      <ListItem style={currentpage===0?{background:"#0004"}:null} button>
        <ListItemIcon>
          <DashboardIcon onClick={()=>changePage(0)} />
        </ListItemIcon>
        <ListItemText onClick={()=>changePage(0)}  primary="Dashboard" />
      </ListItem>
  
      <ListItem style={currentpage===1?{background:"#0004"}:null} button>
        <ListItemIcon>
          <AccountCircleIcon onClick={()=>changePage(1)} />
        </ListItemIcon>
        <ListItemText onClick={()=>changePage(1)}   primary="My Profile" />
      </ListItem>
      <ListItem style={currentpage===2?{background:"#0004"}:null} button>
        <ListItemIcon>
          <LocationOnIcon onClick={()=>changePage(2)} />
        </ListItemIcon>
        <ListItemText onClick={()=>changePage(2)}  primary="Tracking" />
      </ListItem>
      <ListItem style={currentpage===3?{background:"#0004"}:null} button>
        <ListItemIcon>
          <BarChartIcon onClick={()=>changePage(3)}  />
        </ListItemIcon>
        <ListItemText onClick={()=>changePage(3)}  primary="Statistics" />
      </ListItem>
      <ListItem style={currentpage===4?{background:"#0004"}:null} button>
        <ListItemIcon>
          <ExitToAppIcon onClick={()=>changePage(4)} />
        </ListItemIcon>
        <ListItemText onClick={()=>changePage(4)}  primary="LogOut" />
      </ListItem>
    </div>
  )
}
const reports=['makerice is added','makerice reached warehouse','makerice is rated by customer']
export const secondaryListItems = (
  <div>
      <ListItem button>
      <ListItemText inset primary="Recent Transcations" />
      </ListItem>
    {
        reports.map(r=>(
      <ListItem  >
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
        <ListSubheader >{r}</ListSubheader>
       </ListItem>
        ))
    }
  </div>
);