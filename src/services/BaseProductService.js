import axios from 'axios';
import {URL_API} from '../api'
export default class BaseProductService {
    
  get(url, value) {
    return axios({
      url: `${URL_API}${url}`,
      method: 'GET',
      data: value,
      headers: { Authorization: 'Bearer' },
    });
  }
}