# pagewrap

> A Vue.js project

## 前言 ##
中秋活动页面，需要微信授权，中心思想是建立一个中间页，由中间页完成授权以及token的处理，跳转到其他的页面
的时候只需要处理回调即可，creatToken接口接收一个token参数，若localStorage里面没有token属性，接口不接受参数
返回新的token，若有，传入token，则返回的token如果没有过期是原来的token，若过期返回全新的token



## js ##
js部分mixin处理微信的部分，包含授权，回调，关注等等
commin则处理其他的比如过期等等

## 安装步骤 ##

	git clone git@192.168.1.3:BaiShi-H5/moonActive.git		// 把模板下载到本地
	cd moonActive											// 进入模板目录
	npm install												// 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启服务器，浏览器访问 http://localhost:8088
	npm run dev

## 构建生产 ##

	// 执行构建命令，生成的dist文件夹放在服务器下即可访问
	npm run build