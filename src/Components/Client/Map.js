import React from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ReactMapGL, { Marker,Popup } from 'react-map-gl';
import Loading from './Loading';
export default function Map({id,setShift}) {
    const [loc1,setLoc1]=React.useState('');
    const [loc2,setLoc2]=React.useState('');
    const [loc3,setLoc3]=React.useState('');
    const [loc4,setLoc4]=React.useState('');
    const [info1,setInfo1]=React.useState([]);
    const [info2,setInfo2]=React.useState([]);
    const [info3,setInfo3]=React.useState([]);
    const [info4,setInfo4]=React.useState([]);
    const [lat1,setLat1]=React.useState('');
    const [lng1,setLng1]=React.useState('');
    const [lat2,setLat2]=React.useState('');
    const [lng2,setLng2]=React.useState('');
    const [lat3,setLat3]=React.useState('');
    const [lng3,setLng3]=React.useState('');
    const [lat4,setLat4]=React.useState('');
    const [lng4,setLng4]=React.useState('');
    const [error,setError]=React.useState(false);
    const [fpopup,setFpopup]=React.useState(false);
    const [wpopup,setWpopup]=React.useState(false);
    const [dpopup,setDpopup]=React.useState(false);
    const [rpopup,setRpopup]=React.useState(false);
    React.useEffect(()=>{
        if(loc1==='' || loc2==='' || loc3==='' || loc4===''){
            return;
        }
        else{
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc1}.json?access_token=pk.eyJ1IjoiYWJoaWppdGgxMDEyIiwiYSI6ImNraGN5YnVyaDAwbHcyem4wa21qazJuNDkifQ.pkTjml76ZonNf5l9dhyqLw&limit=1`)
            .then(res=>res.json())
            .then(data=>{setLat1(parseFloat(data.features[0].center[1]));setLng1(parseFloat(data.features[0].center[0]))})
            .catch(e=>{setError(true)})
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc2}.json?access_token=pk.eyJ1IjoiYWJoaWppdGgxMDEyIiwiYSI6ImNraGN5YnVyaDAwbHcyem4wa21qazJuNDkifQ.pkTjml76ZonNf5l9dhyqLw&limit=1`)
            .then(res=>res.json())
            .then(data=>{setLat2(parseFloat(data.features[0].center[1]));setLng2(parseFloat(data.features[0].center[0]))})
            .catch(e=>{setError(true)})
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc3}.json?access_token=pk.eyJ1IjoiYWJoaWppdGgxMDEyIiwiYSI6ImNraGN5YnVyaDAwbHcyem4wa21qazJuNDkifQ.pkTjml76ZonNf5l9dhyqLw&limit=1`)
            .then(res=>res.json())
            .then(data=>{setLat3(parseFloat(data.features[0].center[1]));setLng3(parseFloat(data.features[0].center[0]))})
            .catch(e=>{setError(true)})
            fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc4}.json?access_token=pk.eyJ1IjoiYWJoaWppdGgxMDEyIiwiYSI6ImNraGN5YnVyaDAwbHcyem4wa21qazJuNDkifQ.pkTjml76ZonNf5l9dhyqLw&limit=1`)
            .then(res=>res.json())
            .then(data=>{setLat4(parseFloat(data.features[0].center[1]));setLng4(parseFloat(data.features[0].center[0]))})
            .catch(e=>{setError(true)})  
        }
    },[loc1,loc2,loc3,loc4])
    const [viewport,setViewPort]=React.useState({
        latitude:17.455891,
        longitude:78.402807,
        width:'90vw',
        height:'90vh',
        zoom:5
    })
    React.useEffect(()=>{
            Axios({
                method:"POST",
                url:"http://127.0.0.1:3005/api/PrductTracking",
                data:{product_id:id}
            }).then(res=>{
                setLoc1(res.data.details[1][0].Location)
                setLoc2(res.data.details[2][0].Location)
                setLoc3(res.data.details[3][0].Location)
                setLoc4(res.data.details[4][0].Location)
                setInfo1(res.data.details[1])
                setInfo2(res.data.details[2])
                setInfo3(res.data.details[3])
                setInfo4(res.data.details[4])
            }).catch(e=>{setError(true)})  
    },[]);
    if(lat1==='' || lng1==='' || lat2==='' || lng2==='' || lat3==='' || lng3==='' || lat4==='' || lng4===''){
        return(<Loading />)
        }
        else{
            if(error){
               return(
                   <div>Soemthing went Wrong Check your Internet Connection and Try agian</div>
               )
            }
            else{
                return (
                    <div style={{marginLeft:"2rem"}}>
                        <Button variant="contained" color="secondary" onClick={()=>{setShift(0)}} >Go Back</Button>
                        <ReactMapGL 
                        {...viewport}
                        mapboxApiAccessToken={'pk.eyJ1IjoiYWJoaWppdGgxMDEyIiwiYSI6ImNraGN5YnVyaDAwbHcyem4wa21qazJuNDkifQ.pkTjml76ZonNf5l9dhyqLw'}
                        onViewportChange={(viewport)=>{setViewPort(viewport)}}
                        mapStyle={'mapbox://styles/mapbox/streets-v11'}
                        >
                       <Marker
                        latitude={lat1}
                        longitude={lng1}
                      >
                     <img onClick={()=>{setFpopup(true)}} style={{width:"40px",height:"40px"}} src=" https://img.icons8.com/color/48/000000/marker.png" />
                    </Marker>
                    <Marker
                        latitude={lat2}
                        longitude={lng2}
                      >
                     <img onClick={()=>{setWpopup(true)}} style={{width:"40px",height:"40px"}} src=" https://img.icons8.com/color/48/000000/marker.png" />
                    </Marker>
                    <Marker
                        latitude={lat3}
                        longitude={lng3}
                      >
                     <img onClick={()=>{setDpopup(true)}} style={{width:"40px",height:"40px"}} src=" https://img.icons8.com/color/48/000000/marker.png" />
                    </Marker>
                    <Marker
                        latitude={lat4}
                        longitude={lng4}
                      >
                     <img onClick={()=>{setRpopup(true)}} style={{width:"40px",height:"40px"}} src=" https://img.icons8.com/color/48/000000/marker.png" />
                    </Marker>
                    {fpopup && (
                       <Popup
                       latitude={lat1}
                       longitude={lng1}
                       onClose={()=>{setFpopup(false)}}
                       >
                        <h4>Facotry Information</h4>
                        <hr></hr>
                        {
                            info1.map(res=>(
                                <div>
                                    <Typography>Location :{res.Location}</Typography>
                                     <Typography>Address :{res.Address}</Typography>
                                </div>
                            ))
                        }
                       </Popup>
                    )}
                    {wpopup && (
                       <Popup
                       latitude={lat2}
                       longitude={lng2}
                       onClose={()=>{setWpopup(false)}}
                       >
                           <h4>Warehouse Information</h4>
                           <hr></hr>
                        {
                            info2.map(res=>(
                                <div>
                                    <Typography>Location :{res.Location}</Typography>
                                     <Typography>Address :{res.Address}</Typography>
                                </div>
                            ))
                        }
                       </Popup>
                    )}
                    {dpopup && (
                       <Popup
                       latitude={lat3}
                       longitude={lng3}
                       onClose={()=>{setDpopup(false)}}
                       >
                           <h4>Distributor Information</h4>
                           <hr></hr>
                           {
                            info3.map(res=>(
                                <div>
                                    <Typography>Location :{res.Location}</Typography>
                                     <Typography>Address :{res.Address}</Typography>
                                </div>
                            ))
                        }
                       </Popup>
                    )}
                    {rpopup && (
                       <Popup
                       latitude={lat4}
                       longitude={lng4}
                       onClose={()=>{setRpopup(false)}}
                       >
                           <h4>Reatailer Information</h4>
                           <hr></hr>
                           {
                            info4.map(res=>(
                                <div>
                                    <Typography>Location :{res.Location}</Typography>
                                     <Typography>Address :{res.Address}</Typography>
                                </div>
                            ))
                        }
                       </Popup>
                    )}
                        </ReactMapGL>
                    </div>
                )
            }
        }
    
}
