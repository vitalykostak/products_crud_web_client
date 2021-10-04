import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../store/actionsCreators/products';

import Topline from './TopLine';
import ProductsList from './ProductsList';
import AddProductForm from './AddProductForm';

import useWindowSize from '../../hooks/useWindowSize';
import './products_crud.scss';

function ProductsCRUD() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const { products, isVisibleAddProduct } = useSelector(
    state => state.products
  );

  const [width, height] = useWindowSize();

  return (
    <>
      {isVisibleAddProduct && (
        <div className='products-crud__add-form' style={{ height: height }}>
          <div className='products-crud__add-form-inner'>
            <AddProductForm />
          </div>
        </div>
      )}
      <div className='products-crud'>
        <header className='products-crud__topline-box'>
          <Topline />
        </header>
        <h1 className='title products-crud__title'>All hot-dogs</h1>
        <div className='products-crud__products-list-box'>
          <ProductsList products={products} />
        </div>
      </div>
    </>
  );
}

export default ProductsCRUD;
