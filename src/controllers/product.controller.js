import productService from '../services/product.service';

import {
  setProducts,
  deleteProduct,
  addProduct,
  updateProduct,
} from '../store/actionsCreators/products.js';

class ProductController {
  constructor(dispatch) {
    this._dispatch = dispatch;
  }

  async getAllProducts() {
    const products = await productService.getAllProducts();
    this._dispatch(setProducts(products));
  }

  async deleteProduct(product_id) {
    const isDelete = await productService.deleteProduct(product_id);
    if (isDelete) {
      this._dispatch(deleteProduct(product_id));
    }
  }

  async createProduct(product) {
    const createdProduct = await productService.createProduct(product);
    if (createdProduct) this._dispatch(addProduct(createdProduct));
  }

  async updateProduct(product) {
    const updatedProduct = await productService.updateProduct(product);
    if (updatedProduct) this._dispatch(updateProduct(updatedProduct));
  }
}

export default ProductController;
