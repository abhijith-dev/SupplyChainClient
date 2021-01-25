import React from 'react'
import {Typography} from '@material-ui/core';
import Nod from '../../Images/img/nodata.gif';
export default function Nodata() {
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",flexDirection:"column"}}>
           <Typography variant="h2" style={{fontWeight:"600"}} >No Data Found</Typography>
           <img src={Nod} style={{width:"120px",height:"120px"}} alt="loading.." />
           <Typography>The requested product is not supply chain portal or it is not obey the smart supply chain rules.</Typography>
        </div>
    )
}
