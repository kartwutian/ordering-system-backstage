import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    breadcrumb: []
}

const getters = {
    breadcrumb(state){
        return state.breadcrumb
    }
}

const mutations = {
    UPDATEBREADCRUMB: (state, data) =>{
        state.breadcrumb = data
    }
}

const actions = {

}

export default new Vuex.Store({
	state,
	actions,
	mutations,
    getters
})
