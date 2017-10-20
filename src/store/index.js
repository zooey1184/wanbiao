
import Vue from 'vue'
import Vuex from 'vuex'
import Emit from '@/store/emit'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
    Emit,
	},
})
