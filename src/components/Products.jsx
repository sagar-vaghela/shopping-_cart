import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, AddToCart } from '../redux/slices/ecomSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Products = () => {
  const [items, setItems] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('filter');
  const dispatch = useDispatch();
  const products = useSelector((state) => state.ecom.products);
  const loading = useSelector((state) => state.ecom.loading);
  const error = useSelector((state) => state.ecom.error);
  const search = useSelector((state) => state.ecom.search);
  const cart = useSelector((state) => state.ecom.cart);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  useEffect(() => {
    let filteredItems = products;
    if (search) {
      const pattern = /^\S+$/;
      if (pattern.test(search)) {
        filteredItems = filteredItems.filter(
          (item) =>
            item.price.toString().includes(search) ||
            item.stock.toString().includes(search) ||
            item.title.toLowerCase().includes(search.toLowerCase())
        );
      }
    }

    switch (selectedFilter) {
      case 'Name':
        filteredItems = [...filteredItems].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price':
        filteredItems = [...filteredItems].sort((a, b) => a.price - b.price);
        break;
      case 'qty':
        filteredItems = [...filteredItems].sort((a, b) => a.stock - b.stock);
        break;
      case 'Popularity':
        filteredItems = [...filteredItems].sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    const finalItems = filteredItems.filter(
      (item) => !cart.some((cartItem) => cartItem.id === item.id)
    );
    setItems(finalItems);
  }, [search, products, cart, selectedFilter]);

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleCart = (product) => {
    dispatch(AddToCart(product));
    toast.success('Product added to cart', {
      theme: 'dark',
      position: 'bottom-right'
    });
  };

  if (loading)
    return (
      <div className="loader" style={{ margin: '450px auto', justifyContent: 'center' }}></div>
    );

  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <div className="container root_div">
      <div className="mx-0 mx-lg-3 mx-xl-4 mx-xxl-5">
        <div className="row justify-content-end mb-3">
          <div className="col-4 col-md-3 col-lg-2 col-xl-2 col-xxl-1">
            <select
              className="form-select"
              value={selectedFilter}
              aria-label="Filter Products"
              onChange={handleFilterChange}
            >
              <option value="filter">Filter</option>
              <option value="Popularity">Popularity</option>
              <option value="Name">Name</option>
              <option value="price">Price</option>
              <option value="qty">Quantity</option>
            </select>
          </div>
        </div>

        <div className="row">
          {items.length > 0
            ? items.map((product) => (
                <div className="col-xxl-3 col-xl-4 col-md-6 col-sm-12" key={product.id}>
                  <div className="card mb-4 shadow-sm card_div">
                    <Link
                      to={`/productdetails/product/${product.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="product">
                        <img src={product.thumbnail} className="card-img-top" alt={product.title} />
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
                            Add to Cart
                          </button>
                        </div>
                        <small className="text-muted">Qty: {product.stock}</small>
                        <small className="text-muted">Price: ${product.price.toFixed(2)}</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : search && (
                <h3 className="text-center" style={{ margin: '300px 0' }}>
                  No Product Found
                </h3>
              )}
        </div>
      </div>
    </div>
  );
};

export default Products;
