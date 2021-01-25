import React, { useState,useEffect} from 'react';
import { BarChart, XAxis, YAxis, ResponsiveContainer,CartesianGrid,Tooltip,Legend,Bar } from 'recharts';
import Title from './Title';
import Axios from 'axios';
import {GetToken} from '../../../../Auth/AuthToken'
export default function Chart({id,setShowChart}) {
  const [data,setData]=useState([]);
  const [image,setImage]=useState('');
  const [name,setName]=useState('')
  useEffect(()=>{
    Axios({
      method:"POST",
      url:`${process.env.REACT_APP_URL}/productInfo`,
      data:{key:id}
    }).then(res=>{
      if(res.data.flag===200){
        setImage(res.data.data[0].Img);
      setName(res.data.data[0].Name);
      }
      else{
        setImage('');
        setName('')
      }
    })
  },[])
  useEffect(()=>{
    Axios({
      method:"POST",
      headers:{
         'Authorization':`basic ${GetToken()}`
      },
      url:`${process.env.REACT_APP_URL}/ratings`,
      data:{key:id}
    })
    .then(res=>{
     if(res.data.flag==="200"){
      let Data=res.data.data[0].data;
      let newarray=Data.map(d=>{return {month:d.month,est:d.est,rate:d.rate}})
      setData(newarray)
     }
     else{
       setShowChart(false)
     }
    })
  },[id]);
  return (
    <React.Fragment>
      <Title><img src={image} alt="Thumbnail" style={{width:"30px",height:"30px"}} /><div style={{marginTop:"-2.5rem",marginLeft:"2rem"}}>{name}</div></Title>
      <ResponsiveContainer>
      <BarChart margin={{
            top: 3,
            bottom: 12,
          }} width={730} height={250} data={data}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="month" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="rate" fill="#8884d8" />
  <Bar dataKey="est" fill="#82ca9d" />
</BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
