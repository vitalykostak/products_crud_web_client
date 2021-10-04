import React from 'react';
import propTypes from 'prop-types';
import Product from './Product';
import { useSelector } from 'react-redux';
import './products_list.scss';

const ProductsList = React.memo(({ products }) => {
  const editableProduct = useSelector(state => state.products.editableProduct);
  const list = products.map(el => (
    <Product
      key={el.product_id}
      product={el}
      editableProduct={editableProduct}
    />
  ));
  return <div className='products-list'>{list}</div>;
});

ProductsList.propTypes = {
  products: propTypes.arrayOf(propTypes.object),
};
export default ProductsList;
