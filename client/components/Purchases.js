import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import axios from 'axios';
import PurchasesForm from './PurchasesForm';
import PurchasesList from './PurchasesList';
import DebtorList from './DebtorList';

const Purchases = ({ currentUser, currentTrip }) => {
  const [purchases, setPurchases] = useState([]);
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    axios.get(`/split/${currentTrip.id}/${currentUser.id}`).then(({ data }) => {
      setPurchases(
        data.items.map(
          (item) => `${item.description}: $${item.price} (${item.purchaser})`,
        ),
      );
      setDebts(data.debts);
    });
  }, []);
  return (
    <div className="purchase-container">
      <Typography component="h1" variant="h2">
        Purchases
      </Typography>

      <PurchasesForm
        savePurchase={({ description, price }) => {
          const text = `${description}: $${price}`;
          if (text.length > 0) {
            axios
              .post('/split', {
                purchaser_id: currentUser.id,
                trip_id: currentTrip.id,
                description,
                price,
              })
              .then(({ data }) => {
                if (Array.isArray(data)) {
                  data.forEach((payment) => {
                    const name = `${payment.first_name} ${payment.last_name}`;
                    debts[name] = debts[name] ?
                      debts[name] + payment.amount :
                      payment.amount;
                  });
                  setDebts(debts);
                  setPurchases([...purchases, text]);
                }
              });
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
      <Typography component="h4" variant="h5">
        Who owes you?
      </Typography>
      <DebtorList debts={debts} />
    </div>
  );
};

Purchases.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    profile_pic: PropTypes.string,
    host: PropTypes.bool,
    googleId: PropTypes.string,
  }).isRequired,
  currentTrip: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    destination: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }).isRequired,
};

export default Purchases;
