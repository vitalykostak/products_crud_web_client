import ProductController from '../../controllers/product.controller';
import {
  SET_PRODUCTS,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  SET_EDITABLE_PRODUCT,
  SET_VISIBLE_PRODUCT_ADD,
  UNSET_VISIBLE_PRODUCT_ADD,
} from '../actions/product.actions';

export const setProducts = payload => ({
  type: SET_PRODUCTS,
  payload,
});

export const deleteProduct = payload => ({
  type: DELETE_PRODUCT,
  payload,
});

export const addProduct = payload => ({
  type: ADD_PRODUCT,
  payload,
});

export const updateProduct = payload => ({
  type: UPDATE_PRODUCT,
  payload,
});

export const setEditableProduct = payload => ({
  type: SET_EDITABLE_PRODUCT,
  payload,
});

export const setVisibleProductAdd = payload => ({
  type: SET_VISIBLE_PRODUCT_ADD,
  payload,
});

export const unsetVisibleProductAdd = payload => ({
  type: UNSET_VISIBLE_PRODUCT_ADD,
  payload,
});

export const fetchAllProducts = () => dispatch => {
  const productController = new ProductController(dispatch);
  productController.getAllProducts();
};

export const fetchCreateProduct = product => dispatch => {
  const productController = new ProductController(dispatch);
  productController.createProduct(product);
};

export const fetchDeleteProduct = product_id => dispatch => {
  const productController = new ProductController(dispatch);
  productController.deleteProduct(product_id);
};

export const fetchUpdateProduct = product => dispatch => {
  const productController = new ProductController(dispatch);
  productController.updateProduct(product);
};
