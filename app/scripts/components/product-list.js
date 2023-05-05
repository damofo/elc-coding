import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ search = '' }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      if (!search) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:3035/search`, {
          params: {
            search,
          },
        });
        setError('');
        setProducts(res?.data || []);
      } catch (error) {
        setError('Error in loading');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [search]);

  if (error) {
    return <div className='product-error'>{error}</div>;
  }

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (products.length == 0) {
    if (search) {
      return (
        <div className='product-empty'>
          No Products. Please search with different keyword...
        </div>
      );
    }
    return null;
  }

  return (
    <div className='product-container'>
      <div className='product-count'>Total: {products.length}</div>
      <div className='product-list'>
        {products.map((product) => (
          <div key={product.id} className='product'>
            <img src={product.picture} />
            <div className='detail'>
              <h4 className='name'>{product.name}</h4>
              <p className='about'>{product.about}</p>
              <p className='price'>${product.price}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;