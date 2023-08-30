import React from 'react';
import Transactions from './Transactions';

const UserTrans = () => {
   const userRegistrationDate = "2023-01-15";
   const datesList = [
     "2023-01-01",
     "2023-01-10",
     "2023-01-20",
     "2023-02-01",
     "2023-02-15",
   ];
  return (
    <div>
      <h1>Date Filter Example</h1>
      <Transactions
        userRegistrationDate={userRegistrationDate}
        datesList={datesList}
      />
    </div>
  );
}

export default UserTrans;