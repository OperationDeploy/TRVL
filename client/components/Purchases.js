import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import PurchasesForm from './PurchasesForm';
import PurchasesList from './PurchasesList';
import axios from 'axios';

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    axios.get('/split')
      .then(({ data }) => {
        console.log('resonse from server', data)
        setPurchases(data);
      });
  }, []);
  return (
    <div>
      <Typography component="h1" variant="h2">
        Purchases
      </Typography>
  
      <PurchasesForm
        savePurchase={(input) => {
          const text = input.trim();
          if (text.length > 0) {
            setPurchases([...purchases, text]);
          }
        }}
      />
      <PurchasesList
        purchases={purchases}
        deletePurchase={(purchaseIndex) => {
          const newPurchases = purchases.filter((_, index) => index !== purchaseIndex);
          setPurchases(newPurchases);
        }}
      />
    </div>
  );
}

export default Purchases;
