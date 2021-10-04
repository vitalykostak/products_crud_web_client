import {
  SET_PRODUCTS,
  DELETE_PRODUCT,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  SET_EDITABLE_PRODUCT,
  SET_VISIBLE_PRODUCT_ADD,
  UNSET_VISIBLE_PRODUCT_ADD,
} from '../actions/product.actions.js';

const initialState = {
  products: [],
  editableProduct: null,
  isVisibleAddProduct: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: [...action.payload] };
    case DELETE_PRODUCT:
      const product_id = action.payload;
      return {
        ...state,
        products: state.products.filter(el => el.product_id !== product_id),
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
      };
    case UPDATE_PRODUCT:
      console.log(UPDATE_PRODUCT);
      return {
        ...state,
        products: state.products.map(el =>
          el.product_id === action.payload.product_id ? action.payload : el
        ),
      };
    case SET_EDITABLE_PRODUCT:
      return { ...state, editableProduct: action.payload };
    case SET_VISIBLE_PRODUCT_ADD:
      return { ...state, isVisibleAddProduct: true };
    case UNSET_VISIBLE_PRODUCT_ADD:
      return { ...state, isVisibleAddProduct: false };
    default:
      return state;
  }
};

export default productReducer;
