import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { RemoveFromCart } from '../redux/slices/ecomSlice';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const Cart = () => {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.ecom.cart);
  let search = useSelector((state) => state.ecom.search);
  const ref = useRef();

  const handleCart = (product) => {
    dispatch(RemoveFromCart(product));
    toast.error('Product removed from cart');
  };

  useEffect(() => {
    const pattern = /^\S+$/;
    if (search && pattern.test(search)) {
      const filteredItems = cart.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setItems(filteredItems);
    } else {
      if (ref.current.value === 'filter') {
        setItems(cart);
      }
      if (ref.current.value === 'Popularity') {
        const sortedItems = [...cart].sort((a, b) => b.id - a.id);
        setItems(sortedItems);
      }
      if (ref.current.value === 'Name') {
        const sortedItems = [...cart].sort((a, b) => a.title.localeCompare(b.title));
        setItems(sortedItems);
      }
      if (ref.current.value === 'price') {
        const sortedItems = [...cart].sort((a, b) => a.price - b.price);
        setItems(sortedItems);
      }
      if (ref.current.value === 'qty') {
        const sortedItems = [...cart].sort((a, b) => a.stock - b.stock);
        setItems(sortedItems);
      }
    }
  }, [search, cart]);

  const handleFilter = (e) => {
    const value = e.target.value;
    if (value === 'Popularity') {
      const sortedItems = [...items].sort((a, b) => b.id - a.id);
      setItems(sortedItems);
    }
    if (value === 'Name') {
      const sortedItems = [...items].sort((a, b) => a.title.localeCompare(b.title));
      setItems(sortedItems);
    }
    if (value === 'price') {
      const sortedItems = [...items].sort((a, b) => a.price - b.price);
      setItems(sortedItems);
    }
    if (value === 'qty') {
      const sortedItems = [...items].sort((a, b) => a.stock - b.stock);
      setItems(sortedItems);
    }
  };
  return (
    <div>
      <Header />
      <div className="container root_div">
        <div className="mx-0 mx-lg-3 mx-xl-4 mx-xxl-5">
          <div className="row justify-content-between mb-3">
            <div className="col-4">
              <Link to="/">
                <button className="btn btn-dark opacity-75 mb-3 rounded-0 ">Back to Home</button>
              </Link>
            </div>
            <div className="col-4 col-md-3 col-lg-2 col-xl-2 col-xxl-1">
              <Form.Select
                aria-label="Default select example"
                ref={ref}
                defaultValue={'filter'}
                onChange={(e) => handleFilter(e)}
              >
                <option value="filter" disabled>
                  Filter
                </option>
                <option value="Popularity">Popularity</option>
                <option value="Name">Name</option>
                <option value="price">Price</option>
                <option value="qty">quantity</option>
              </Form.Select>
            </div>
          </div>
          <div className="row">
            {items.length === 0 && <h1 className="text-center">Cart is Empty</h1>}
            {items?.map((product) => (
              <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-12 " key={product.id}>
                <div className="card mb-4 shadow-sm card_div">
                  <Link
                    to={`/productdetails/product/${product.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div className="product">
                      <img
                        src={product.thumbnail}
                        className="card-img-top"
                        alt={product.title}
                        id={`product${product.id}`}
                      />
                    </div>
                  </Link>
                  <div className="card-body">
                    <p className="card-text">{product.title}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <Link to={`/productdetails/product/${product.id}`}>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary rounded-0"
                          >
                            View
                          </button>
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleCart(product)}
                        >
                          Remove to Cart
                        </button>
                      </div>
                      <small className="text-muted">Qty: {product.stock}</small>
                      <small className="text-muted">Price:${product.price}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row mb-3">
            <div className="col-12 text-center">
              {items.length > 0 && (
                <Link to="/bill">
                  <button className="btn btn-dark opacity-75 rounded-0">Proceed to Checkout</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
