
import BaseProductService from './BaseProductService';

const PREFIX = 'Product';
export class ProductServices extends BaseProductService {
  getListCategory() {
    return this.get(`/${PREFIX}/getAllCategory`);
  }
  getListProductByCategory(id) {
    return this.get(`/${PREFIX}/getProductByCategory?categoryId=${id}`);
  }
  getListProductById(id) {
    return this.get(`/${PREFIX}/getbyid?id=${id}`);
  }
  getAllProduct() {
    return this.get(`/${PREFIX}/`);
  }
 
  
}

export const productServices = new ProductServices();