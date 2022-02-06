import axios from 'axios';
import {URL_API} from '../api'
export default class InteractUserService {
    
  get(url, token) {
    return axios({
      url: `${URL_API}${url}`,
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}