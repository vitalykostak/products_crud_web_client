import React from 'react';
import { useDispatch } from 'react-redux';
import { unsetVisibleProductAdd } from '../../../store/actionsCreators/products.js';
import { Field, reduxForm } from 'redux-form';
import { fetchCreateProduct } from '../../../store/actionsCreators/products.js';
import productService from '../../../services/product.service.js';
import './add-produc.scss';

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
  const { product_name } = values;
  const product = await productService.getProductByName(product_name);

  if (!product) {
    return;
  }
  throw { product_name: 'Already exists' };
};
const renderField = ({
  input,
  type,
  label,
  meta: { asyncValidating, touched, error },
  ...rest
}) => {
  return (
    <>
      <input {...input} {...rest} type={type} placeholder={label} />
      {error && <span>{error}</span>}
      {asyncValidating && <span>Validating</span>}
    </>
  );
};

let AddProductForm = props => {
  const { handleSubmit, submitSucceeded: submitting } = props;
  const dispatch = useDispatch();
  const hideAddProductForm = () => dispatch(unsetVisibleProductAdd());

  const submit = values => {
    dispatch(fetchCreateProduct(values));
    hideAddProductForm();
  };
  return (
    <form className='add-product-form' onSubmit={handleSubmit(submit)}>
      <h2 className='add-product-form__title title'>Add hot dog</h2>
      <p className='add-product-form__close' onClick={hideAddProductForm}>
        Close
      </p>
      <Field
        className='add-product-form__input'
        name='product_name'
        type='text'
        label='Name'
        component={renderField}
      />
      <Field
        className='add-product-form__input'
        name='unit_price'
        type='number'
        label='Price'
        component={renderField}
      />
      <Field
        className='add-product-form__input'
        type='text'
        name='unit_description'
        label='Description'
        component={renderField}
      />
      <div className='add-product-form__btn-box'>
        <button className='add-product-form__btn' onClick={hideAddProductForm}>
          No Thanks
        </button>
        <button className='add-product-form__btn' type='submit'>
          Add
        </button>
      </div>
    </form>
  );
};

AddProductForm = reduxForm({
  form: 'addProduct',
  validate,
  asyncValidate,
  asyncBlurFields: ['product_name'],
})(AddProductForm);

export default AddProductForm;
