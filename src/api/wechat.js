import http from './http'
import axios from './index'


const path = {
  sign: 'api/oauth/getSign',
  token: 'api/user/token/create',
  auth: 'api/oauth/wechat/getAuthUrl',
  callback: 'api/oauth/wechat/callback',
  careWeb: 'api/oauth/isAttention',
}

export default {
  sign(params){
    return http.get(path.sign, params)
  },
  token(params){
    // return axios.post(`${head}/${path.token}`, params)
    return http.post(path.token, params)
  },
  auth(params, obj={}){
    return http.get(path.auth, params, obj)
  },
  callback(params, obj={}){
    return http.get(path.callback, params, obj)
  },
  careWeb(params, token={}){
    return http.get(path.careWeb, params, token)
  },
  info(params){
    return http.get(path.info, params)
  }
}
