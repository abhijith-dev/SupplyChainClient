import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {GetToken} from '../../../../Auth/AuthToken';
import Title from './Title';
import Axios from 'axios';
export default function Orders() {
  const [data,setData]=useState([]);
  useEffect(()=>{
    Axios({
      headers:{
        'Authorization':`basic ${GetToken()}`
      },
      method:"POST",
      url:`${process.env.REACT_APP_URL}/fetchfoods`,
    }).then(res=>{
      console.log(res.data)
      setData(res.data);
    })
  },[])
  if(data.length){
    return (
      <React.Fragment>
        <Title>Recent Products</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>IMAGE</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell align="right">M.R.P PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell><img src={row.Img} alt="Thumbnail" style={{width:"30px",height:"30px"}} /></TableCell>
                <TableCell>{row.F_id}</TableCell>
                <TableCell>{row.Name}</TableCell>
                <TableCell>{row.Date}</TableCell>
                <TableCell align="right">Rs.{row.Prize}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
  else{
    return(
      <div>
        <Title>Recent Products</Title>
       <div style={{textAlign:"center"}}>No data</div>
      </div>
    )
  }
}