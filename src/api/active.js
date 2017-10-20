import http from './http'

const path = {
  
  // 七牛url
  baseUrl: 'api/common/qiniuBaseUrl',
  // 插入图片
  insertImg: 'api/resource/upload',
}

export default {
  
  baseUrl(params){
  	return http.get(path.baseUrl, params)
  },
  insertImg(params){
  	return http.post(path.insertImg, params)
  },

}
