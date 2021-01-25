import React from 'react'
import Carousel from 'react-material-ui-carousel';
import {Paper} from '@material-ui/core';
import Flogin from '../LoginFactory/Flogin';
import Wlogin from '../LoginWarehouse/Wlogin';
import Dlogin from '../LoginDistributor/Dlogin';
import Rlogin from '../LoginRetailer/Rlogin';
export default function LoginIndex() {
    const items = [
        {
            component:<Flogin />
        },
        {
            component:<Wlogin /> 
        },
        {
            component:<Dlogin />   
        },
        {
            component:<Rlogin />   
        }

    ]
function Item(props)
{
    return (
        <Paper style={{height:"93vh"}} elevation={5}>
           {props.item.component}
        </Paper>
    )
}
    return (
        <Carousel autoPlay={false}>
       {
        items.map( (item, i) => <Item key={i} item={item} /> )
        }
       </Carousel>
    )
}
