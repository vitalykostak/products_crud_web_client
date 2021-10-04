import api from '../api';

class ProductService {
  async getAllProducts() {
    const result = await api.get('/product');
    const json = await result.json();
    return json.products;
  }

  async deleteProduct(product_id) {
    const result = await api.delete('/product', { product_id });
    if (result.status === 204);
    return true;
  }

  async createProduct(product) {
    const result = await api.post('/product', product);

    if (result.status === 201) {
      const { createdProduct } = await result.json();
      return createdProduct;
    }
  }

  async updateProduct(product) {
    const result = await api.put('/product', product);

    if (result.status === 200) {
      const { updatedProduct } = await result.json();
      return updatedProduct[0];
    }
  }

  async getProductByName(product_name) {
    const response = await api.get(`/product/find_by_name/${product_name}`);
    if (response.status === 200) {
      const json = await response.json();
      return json.product[0];
    }
  }
}

export default new ProductService();
