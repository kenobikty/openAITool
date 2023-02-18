import ApiError from '@/api/ApiError';
import axios, { Axios } from 'axios';
import mergeConfig from 'axios/lib/core/mergeConfig';

/**
 * @this {AxiosInstance}
 * @param {AxiosRequestConfig} [config]
 * @return {AxiosInstance} inherited instance
 */
Axios.prototype.extend = function (config) {
  const instance = axios.create(mergeConfig(this.defaults, config));
  instance.interceptors.request.handlers = this.interceptors.request.handlers.slice();
  instance.interceptors.response.handlers = this.interceptors.response.handlers.slice();
  return instance;
};

const token = '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'

export function createInstance() {
  const instance = axios.create({
    // url = base url + request url
    get baseURL() {
      return this.host + this.base;
    },
    get base() {
      return '/v1';
    },
    get host() {
      return process.env.VUE_APP_API_HOST || 'https://api.openai.com';
    },
    headers: {'Authorization': 'Bearer '+token},
    //withCredentials: true, // send cookies when cross-domain requests
    timeout: process.env.NODE_ENV === 'production' ? 20000 : 0, // request timeout
    validateStatus: null, // treat all response as success, we will handle it manually
  });

  // request interceptor
  instance.interceptors.request.use(
    async config => {
      // shallow serialize params
      {
        const p = config.params;
        if (p && typeof p === 'object') {
          const params = {};
          for (const [k, v] of Object.entries(p)) {
            if (typeof v !== 'string' && typeof v !== 'undefined') {
              params[k] = JSON.stringify(v);
            } else {
              params[k] = v;
            }
          }
          config.params = params;
        }
      }

      // throttle network for debugging UX
      if (process.env.VUE_APP_THROTTLE_NETWORK) {
        await new Promise(cb =>
          setTimeout(cb, Math.random() * parseInt(process.env.VUE_APP_THROTTLE_NETWORK)),
        );
      }

      return config;
    },
    error => {
      // do something with request error
      // console.error(error); // for debug
      return Promise.reject(error);
    },
  );

  // response interceptor
  instance.interceptors.response.use(
    response => {
      if (response.status >= 400 || (response.data && response.data.error)) {
        const ae = ApiError.wrap(response);
        // if (ae.code === 'invalid_status') {
        //   ae.message = 'invalid_status_time_in_future';
        // }
        return Promise.reject(ae);
      } else {
        return response;
      }
    },
    error => {
      // console.error(error); // for debug
      return Promise.reject(error);
    },
  );
  return instance;
}

/**
 * @type {AxiosInstance}
 */
const service = createInstance();

export default service;
