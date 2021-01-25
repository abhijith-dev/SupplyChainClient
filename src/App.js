import { useEffect,useState} from 'react';
import {GetToken} from './Auth/AuthToken';
import {Switch,Route} from 'react-router-dom';
import MIndex from './Components/FWDR/Index/MIndex';
import './App.css';
import SessionLoading from './Components/FWDR/SessionLoading/SessionLoading';
import Loading from './Components/FWDR/Loading/Loading';
import LoginIndex from './Components/FWDR/Login/LoginIndex/LoginIndex';
import SignupFactory from './Components/FWDR/Signup/SignupFactory/SignupFactory';
import SignupWareHouse from './Components/FWDR/Signup/SignupWareHouse/SignupWareHouse';
import SignupDistributor from './Components/FWDR/Signup/SignupDistributor/SignupDistributor';
import SignupRetailer from './Components/FWDR/Signup/SignupRetailer/SignupRetailer';
import Dashboard from './Components/FWDR/DashBoard/DashBoardFactory/DashBoard';
import DashboardW from './Components/FWDR/DashBoard/DashBoardWarehouse/DashBoardW';
import DashboardD from './Components/FWDR/DashBoard/DashBoardDistributor/DashBoardD';
import DashboardR from './Components/FWDR/DashBoard/DashBoardRetailer/DashBoardR';
import Cindex from './Components/Client/Cindex';
import Axios from 'axios';
import Termsandcondition from './Components/FWDR/Termsandcondition';
const App=()=> {
  // const {REACT_APP_URL}=process.env;
  const [loading,setLoading]=useState(false);
  const [sessionloading,setSessionloading]=useState(false);
  const [user,setUser]=useState(null);
  //loading...
  useEffect(async()=>{
       let ispreviouslyLoaded=sessionStorage.getItem('loaded');
       if(ispreviouslyLoaded===null){
         setSessionloading(true);
         await setTimeout(()=>{setSessionloading(false)},6000);
         sessionStorage.setItem('loaded',true);
         setLoading(true);
         await setTimeout(()=>{setLoading(false)},8000);
       }
       else{
         setLoading(true);
         await setTimeout(()=>{setLoading(false)},2000);
       }
  },[]);
  //token auth and userFetch...
  useEffect(()=>{
  let token=GetToken();
  if(token===null){
    setUser(null);
  }
  else{
    Axios({
      method:"POST",
      url:`${process.env.REACT_APP_URL}//verifyToken`,
      headers:{
        'Authorization':`Basic ${GetToken()}`
      }
    }).then(res=>setUser(res.data))
  }
  },[]);
  return (
    <div>
      <Switch>
        <Route exact path="/">
        {
         sessionloading?<SessionLoading />:(
           <div>
             {loading?<Loading />:(
               <div>
                 {
                   user?(<>{user.role==='F'?<Dashboard />:(<>{user.role==='W'?<DashboardW />:(<>{user.role==='D'?<DashboardD />:(<>{user.role==='R'?<DashboardR />:null}</>)}</>)}</>)}</>):<MIndex />
                 }
               </div>  
             )
             }
           </div>
         )
        }
        </Route>
        <Route exact path="/client">
        <Cindex />
        </Route>
        <Route exact path="/auth">
        <LoginIndex />
        </Route>
        <Route exact path="/createFactoryAccount">
        <SignupFactory />
        </Route>
        <Route exact path="/createWareHouseAccount">
        <SignupWareHouse />
        </Route>
        <Route exact path="/createDistributorAccount">
        <SignupDistributor />
        </Route>
        <Route exact path="/createRetailerAccount">
        <SignupRetailer />
        </Route>
        <Route exact path="/termsandcondition">
        <Termsandcondition />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
 