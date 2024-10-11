import React from 'react';
import { useEffect, useState } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Bill = () => {
  const cart = useSelector((state) => state.ecom.cart);
  let search = useSelector((state) => state.ecom.search);
  const [data, setData] = useState([]);
  const [qty, setQty] = useState(null);

  useEffect(() => {
    setData(cart);
    setQty(data.map((item) => item.stock - (item.stock - 1)));
  }, [cart, data]);

  useEffect(() => {
    const pattern = /^\S+$/;
    if (search && pattern.test(search)) {
      const filteredItems = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setData(filteredItems);
    } else {
      setData(cart);
    }
  }, [search, data, cart]);

  const handleInc = (index) => {
    const newQty = [...qty];
    if (newQty[index] < data[index].stock) {
      newQty[index] = newQty[index] + 1;
      setQty(newQty);
    } else {
      toast.warn('out of stock');
    }
  };

  const handleDec = (index) => {
    const newQty = [...qty];
    if (newQty[index] > 1) {
      newQty[index] = newQty[index] - 1;
      setQty(newQty);
    } else {
      toast.warn('Minimum quantity reached');
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 align-self-center">
            <h1 className="text-center mt-5">Final Bill</h1>
            <table className="table table-dark table-striped table-hover overflow-y-auto">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Inc Qty</th>
                  <th>Qty</th>
                  <th>Dec Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{Math.ceil(item.price)}</td>
                    <td>
                      <button className="btn btn-success" onClick={() => handleInc(index)}>
                        +
                      </button>
                    </td>
                    <td>{qty[index]}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDec(index)}>
                        -
                      </button>
                    </td>
                    <td>{Math.ceil(item.price * qty[index])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <h1>
              Total Amount to Pay:{' $'}
              {Math.ceil(data.reduce((acc, item, index) => acc + item.price * qty[index], 0))}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bill;
