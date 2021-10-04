import React from 'react';
import propTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';
import {
  fetchDeleteProduct,
  fetchUpdateProduct,
} from '../../../../store/actionsCreators/products.js';
import productService from '../../../../services/product.service.js';

const validate = values => {
  const { product_name, unit_price, unit_description } = values;
  const errors = {};
  if (!product_name) {
    errors.product_name = 'Required';
  }
  if (!unit_price) {
    errors.unit_price = 'Required';
  } else if (+unit_price <= 0) {
    errors.unit_price = 'Must be more than 0';
  }

  if (!unit_description) {
    errors.unit_description = 'Required';
  } else if (unit_description.trim().length === 0) {
    errors.unit_description = 'Required';
  }
  return errors;
};
const asyncValidate = async values => {
  const { product_name, product_id } = values;
  const product = await productService.getProductByName(product_name);

  if (!product) {
    return;
  }
  if (
    product_name === product.product_name &&
    product_id !== product.product_id
  ) {
    throw { product_name: 'Already exists' };
  }
};
const renderField = ({
  input,
  type,
  meta: { asyncValidating, touched, error },
  ...rest
}) => {
  return (
    <>
      <input {...input} {...rest} type={type} />
      {error && <span>{error}</span>}
      {asyncValidating && <span>Validating</span>}
    </>
  );
};

let EditableProductCard = ({
  initialValues,
  disableEditing,
  error,
  submiting,
  handleSubmit,
}) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(fetchDeleteProduct(initialValues.product_id));
  };
  const submit = values => {
    dispatch(fetchUpdateProduct(values));
    disableEditing();
  };
  return (
    <form className='product-card__inner' onSubmit={handleSubmit(submit)}>
      <div className='product-card__product-image-box'>
        <img
          className='product-card__product-image'
          src={initialValues.product_image || 'images/logo.png'}
          alt='product'
        />
      </div>

      <Field
        name='product_name'
        className='product-card__product-name'
        component={renderField}
      />
      <Field
        className='product-card__product-price'
        name='unit_price'
        component={renderField}
      />
      <Field
        className='product-card__product-description'
        name='unit_description'
        component={renderField}
      />

      <button
        className='product-card__button button'
        disabled={error || submiting}
      >
        Upgrade
      </button>
      <button className='product-card__button button' onClick={deleteProduct}>
        Delete
      </button>
      <div className='product-card__close-editable' onClick={disableEditing}>
        Close
      </div>
    </form>
  );
};

EditableProductCard.propTypes = {
  product: propTypes.object,
  onClick: propTypes.func,
};

EditableProductCard = reduxForm({
  form: 'editProduct',
  asyncValidate,
  validate,
  asyncBlurFields: ['product_name'],
})(EditableProductCard);
export default EditableProductCard;
