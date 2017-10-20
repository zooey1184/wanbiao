export default {
  state: {
    attention: 0,
    shareModal: false,
    infoData: {},   // 个人信息
  },
  mutations: {
    SET_ATTENTION(state, att){
      state.attention = att
    },
    SET_SHARE(state, modal){
    	state.shareModal = modal
    },
    SET_DATA(state, data){
      state.infoData = data
    }
  },
  actions: {
    set_attention(state, att){
      state.commit('SET_ATTENTION', att)
    },
    set_share(state, modal){
    	state.commit('SET_SHARE', modal)
    },
    set_data(state, data){
      state.commit('SET_DATA', data)
    }
  },
  getters: {
    get_attention(state){
      return state.attention
    },
    get_share(state){
    	return state.shareModal
    },
    get_data(state){
      return state.infoData
    }
  }
}
