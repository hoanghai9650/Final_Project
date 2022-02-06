import axios from 'axios';
import {URL_API} from '../api'

export default class BaseUserService {
    
  get(url, value, token) {
    return axios({
      url: `${URL_API}${url}`,
      method: 'POST',
      data: value,
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
