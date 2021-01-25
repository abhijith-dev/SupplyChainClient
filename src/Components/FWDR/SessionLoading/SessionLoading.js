import React from 'react';
import '../SessionLoading/SessionLoading.css';
import Screen from '../../../Images/img/sc.gif';
export default function SessionLoading() {
    return (
        <div className="Screen">
          <img src={Screen} className="img" alt="loading...." /> 
        </div>
    )
}
