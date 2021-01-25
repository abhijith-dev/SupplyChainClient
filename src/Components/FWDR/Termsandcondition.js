import React from 'react';
import {Container} from '@material-ui/core';
export default function Termsandcondition() {
    return (
        <Container>
          <h1>Terms and condition of smart supply chain</h1>
          <p>
              Smart supply chain used get the the whole supply chain of desired product.
              All customers can free to access benficial of smart supply chain.user can get the
              product details by its id available in packet or box of products.
          </p>
          <h3>Some rules and regulations for adding factroy,warehouse,distributor and retailer</h3>
          <ul>
              <li>factroy should have their own SSL id for registration</li>
              <li>Warehouse,Distributor and Retailer can register by their id genareted by respected factroy.</li>
              <li>All Manufactures can't edit or update and delete your account once you added to supply chain because of security reason</li>
              <li>Product should be verified by  all sector then only it is visibale of all customers.</li>
          </ul>
          <h4>Thank you</h4>
        </Container>
    )
}
