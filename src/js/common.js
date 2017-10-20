export default {
	endFn(){
	  let t = true
	  let dateOri = new Date("Fri Sep 30 2017 16:00:00 GMT+0800 (中国标准时间)")
	  // let dateOri = new Date("Fri Sep 15 2017 16:00:00 GMT+0800 (中国标准时间)")
	  let date = dateOri.getTime()
	  let today = new Date().getTime()
	  if(today>date){
	    t = false
	  }else {
	    t = true
	  }
	  return t
	},
	urlQuery(url=''){
		let obj = {}
		if(url.match(/\?/g)){
			let hash = url.split('?')[1]
			// 判断是否多个参数
			if(hash.match(/\&/g)){
				let arr = hash.split('&')
				for(let [k, v] of arr.entries()){
					let key = v.split('=')[0]
					let val = v.split('=')[1]
					obj[key] = val
				}
			}else {
				let key = hash.split('=')[0]
				let val = hash.split('=')[1]
				obj.key = val
			}
		}else {
			console.log('没有参数')
		}
		console.log(obj)
		return obj
	}
}
