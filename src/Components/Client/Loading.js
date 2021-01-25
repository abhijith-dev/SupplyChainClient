import React from 'react'
import Loader from '../../Images/img/maploading.gif'
export default function Loading() {
    return (
      <div style={{display:"flex",justifyContent:"center",alignContent:"center",textAlign:"center"}}>
        <img src={Loader} alt="loading.." />
      </div>
    )
}
