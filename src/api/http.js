import axios from './index'
import md from '@/js/md5'

const sign_key = 'ZVdvn7JgYmcwF21AYpXUffnW7CgYIsAm'

export default {
	post(path, params={}, obj={}){
		let token = localStorage.getItem('token')
		let target = {}
		if(!!token && token!='' && token!='undefined' && token!='null' && token!=null){
			target = {
				token: token
			}
		}
		Object.assign(params, target, obj)
		let form = new FormData()
		let arr = []
		let str = ''
		for(let a of Object.keys(params)){
			arr.push(a)
		}
		let arrSort = arr.sort()
		for(let b of arrSort){
			let val = params[b]
			str += `${b}=${val}&`
			form.append(b, val)
		}
		let newStr = `${str}${sign_key}`
		let sign = md.hex_md5(newStr)
		return axios.post(`${path}?sign=${sign}`, form)
    // return axios.post(`${path}`, form)
	},
	get(path, params={}, obj={}){
		let token = localStorage.getItem('token')
		let target = {}
		if(!!token && token!='' && token!='undefined' && token!='null' && token!=null){
			target = {
				token: token
			}
		}
		Object.assign(params, target, obj)
		let arr = []
		let str = ''
		for(let a of Object.keys(params)){
			arr.push(a)
		}
		let arrSort = arr.sort()
		for(let b of arrSort){
			let val = params[b]
			str += `${b}=${val}&`
		}
		let newStr = `${str}${sign_key}`
		let sign = md.hex_md5(newStr)
		return axios.get(`${path}?sign=${sign}&${str}`)
    // return axios.get(`${path}?${str}`)
	}
}
