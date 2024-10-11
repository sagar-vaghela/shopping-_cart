import React from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart, fetchProductById } from '../redux/slices/ecomSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Productdetails = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.ecom.cart);
  let { id } = useParams();
  const product = useSelector((state) => state.ecom.product);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleCart = (product) => {
    dispatch(AddToCart(product));
    const cartItem = cart.some((item) => item.id === product.id);
    if (cartItem) {
      toast.error('Product already in cart');
    } else {
      toast.success('Product added to cart');
    }
  };

  return (
    <div key={product?.id}>
      <Header />
      <div className="container">
        <div className="row details justify-content-center">
          <div className="col-12 col-xxl-8">
            <div className="card mb-4 shadow-sm">
              <h1 className="text-center mt-5 text-capitalize">{product?.brand}</h1>
              <div className="product">
                <img src={product?.thumbnail} className="card-img-top" alt={product?.title} />
              </div>
              <div className="card-body d-flex flex-column">
                <h3>{product?.title}</h3>
                <p className="card-text">Price${product?.price}</p>
                <p className="card-text">{product?.description}</p>
                <p className="card-text">Warranty Information:- {product?.warrantyInformation}</p>
                <button className="btn btn-primary btn_cart" onClick={() => handleCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;
