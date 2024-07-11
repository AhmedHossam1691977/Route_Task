import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function CustomerTable() {
    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState({ name: '', amount: '' });


    useEffect(() => {
        const fetchData = async () => {
            const customerRes = await axios.get('http://localhost:5000/customers');
            const transactionRes = await axios.get('http://localhost:5000/transactions');
            setCustomers(customerRes.data);
            setTransactions(transactionRes.data);
        };
        fetchData();
    }, []);

    const filteredCustomers = customers.filter(customer => {
        const customerTransactions = transactions.filter(t => t.customer_id === customer.id);
        const totalAmount = customerTransactions.reduce((acc, t) => acc + t.amount, 0);
        return (
            customer.name.toLowerCase().includes(filter.name.toLowerCase()) &&
            (!filter.amount || totalAmount >= parseInt(filter.amount))
        );
    });

    return (
        <>
            <div className="container">
                <div className="row my-5">
                    <div className="inpout d-flex align-items-center justify-content-center">
                        <input
                            className='form-control mx-3 bg-light border border-black border-3'
                            type="text"
                            placeholder="Filter by name"
                            value={filter.name}
                            onChange={e => setFilter({ ...filter, name: e.target.value })}
                        />
                        <input
                            className='form-control mx-3 bg-light border border-black border-3'
                            type="number"
                            placeholder="Filter by amount"
                            value={filter.amount}
                            onChange={e => setFilter({ ...filter, amount: e.target.value })}
                        />
                    </div>
                    <div className="table my-5">
                        <table className="Min-table table table-striped table-bordered">
                            <thead>
                                <tr>
                                    
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map(customer => {
                                    
                                    return<>
                                    
                                 
                                    <Link className='Link w-100' to={`/TransactionGraph/${customer.id}`}>
      <div className='table-responsive'>
       
         
            <tr key={customer.id}>
                <td className='my-5 px-5'>{customer.id}</td>
              <td className='name text-info border-bottom w-100 ' >{customer.name}</td>
         
            </tr>
    
   
      </div>
    </Link>



                                    </>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}