import axios from 'axios'

// http://120.55.12.45/wbgame/api/common/qiniuBaseUrl
const baseURL = `http://game.wbiao.com.cn/wbgame/`;
const instance = axios.create({
	baseURL,
})
// 统一请求的触发
instance.interceptors.request.use(function (config) {
	return config;
}, function (error) {
	return Promise.reject(error);
});

// 统一响应的触发
instance.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.response) {
    switch (error.response.status) {

    }
  }
  return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});


export default instance;
