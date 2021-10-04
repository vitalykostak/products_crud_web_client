import React from 'react';
import propTypes from 'prop-types';

function ProductCard({ product, onClick }) {
  return (
    <div className='product-card__inner'>
      <div className='product-card__product-image-box'>
        <img
          className='product-card__product-image'
          src={product.product_image || 'images/logo.png'}
          alt='product'
        />
      </div>

      <p className='product-card__product-name'>{product.product_name}</p>
      <p
        className='product-card__product-price'
        data-currency={product.currency}
      >
        {product.unit_price}
      </p>
      <p className='product-card__product-description'>
        {product.unit_description}
      </p>
      <button className='product-card__button button' onClick={onClick}>
        Edit
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: propTypes.object,
  onClick: propTypes.func,
};

export default ProductCard;
