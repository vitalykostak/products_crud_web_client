import React from 'react';
import propTypes from 'prop-types';
import ProductCard from './ProductCard';
import EditableProductCard from './EditableProductCard';
import { useDispatch } from 'react-redux';
import { setEditableProduct } from '../../../../store/actionsCreators/products';

import './product-card.scss';

const Product = React.memo(({ product, editableProduct }) => {
  const dispatch = useDispatch();

  const disableEditing = () => dispatch(setEditableProduct(null));
  const enableEditing = () => {
    if (!editableProduct) {
      dispatch(setEditableProduct(product.product_id));
    }
  };
  return editableProduct === product.product_id ? (
    <div className='product-card--editable'>
      <EditableProductCard
        initialValues={product}
        disableEditing={disableEditing}
      />
    </div>
  ) : (
    <div className='product-card'>
      <ProductCard product={product} onClick={enableEditing} />
    </div>
  );
});

Product.propTypes = {
  product: propTypes.object,
};

export default Product;
