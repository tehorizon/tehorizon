import Axios from 'axios';
import { getCommonParams, getAuthHeader } from './networkHelpers';
import { store } from '../redux/store/store';
import { CLEAR_SESSION } from '../modules/auth/redux/actions/authActions';
import { getEncyptedString } from './encryption';
const axios = Axios.create();

axios.interceptors.request.use(
  (config) => {
    const contentType =
      config.data instanceof FormData
        ? 'multipart/form-data'
        : 'application/json';

    config.headers = {
      'Content-Type': config.headers['Content-Type'] || contentType,
      Authorization:
        config.headers.Authorization || getAuthHeader().Authorization,
    };
    const commonParams = getCommonParams();
    if (config.data instanceof FormData) {
      const field = config.data
        .getParts()
        .find((item) => item.fieldName === 'params');
      if (field) {
        /**
         *  has "params" key value set to it
            if it has "params" key, create new form data object, because there is no way to update it in react native
         */
        const form = new FormData();
        form.append('params', getEncyptedString(commonParams));
        config.data = form;
      } else {
        Object.entries(commonParams).forEach((entry) => {
          const [key, value] = entry;
          config.data.append(key, value);
        });
      }
    } else {
      config.data = Object.assign({}, commonParams, config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      if (
        !error.response.config.url.includes(
          '/et_rs_prd/web/v70/user/products/merchant'
        ) &&
        error.response.status === 403
      ) {
        store.dispatch({
          type: CLEAR_SESSION,
        });
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default axios;
