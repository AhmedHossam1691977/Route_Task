import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
export default function TransactionGraph() {
  const [userData, setUserData] = useState([]);


  const {id} =useParams()

  useEffect(()=>{
    console.log(id);
    handleSelectCustomer()
  },[])


  const handleSelectCustomer = async (customerId) => {
    const { data } = await axios.get(`http://localhost:5000/transactions?customer_id=${id}`);
    setUserData(data);
    console.log(data);
};


  return <>
  
  <div className="container">
    <div className="row">

    <div className="transaction-details my-5">
                        {userData.length > 0 && (
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>Transaction ID</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.map(transaction => (
                                        <tr key={transaction.id}>
                                            <td>{transaction.id}</td>
                                            <td>{transaction.amount}</td>
                                            <td>{transaction.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>






<div className='recharts'>

<ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={userData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>

</div>




    </div>
  </div>
  
  </>
}
