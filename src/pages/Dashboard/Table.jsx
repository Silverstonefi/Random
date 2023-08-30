import React, { useState } from "react";

const TransactionTable = ({ transactions }) => {
  console.log("first", transactions);

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {/* <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Receiver
                  </th> */}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* <tr>
                  <td className="px-6 py-4 whitespace-nowrap">recipient</td>
                  <td className="px-6 py-4 whitespace-nowrap">type</td>
                  <td className="px-6 py-4 whitespace-nowrap">00.00</td>
                  <td className="px-6 py-4 whitespace-nowrap">pending</td>
                  <td className="px-6 py-4 whitespace-nowrap">
            
                    some date
                  </td>
                </tr> */}
                {transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    {/* <td className="px-6 py-4 whitespace-nowrap">recipient</td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
