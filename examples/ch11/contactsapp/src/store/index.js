import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import mutations from './mutations.js';
import actions from './actions.js';

Vue.use(Vuex);

// state, mutations, actions과 이를 저장하는 저장소 객체를 작성하였습니다.
// 이벤트 버스 객체는 더 이상 필요하지 않다.
const store = new Vuex.Store({
    state,
    mutations,
    actions,
})

export default store;