import Vue from 'vue';
import Vuex from 'vuex';
import Constant from '../Constant';
import module1 from './module1'

Vue.use(Vuex);

// 루트 저장소 객체 src/store/index.js
const store = new Vuex.Store({
    state: {
        keywordlist: []
    },
    mutations: {
        [Constant.ADD_KEYWORD]: (state, payload) => {
            state.keywordlist.splice(0, 0, payload.name);
        }
    },
    actions: {
        [Constant.ADD_KEYWORD]: (store, payload) => {
            store.commit(Constant.ADD_KEYWORD, payload);
        }
    },
    // 검색 기근을 모듈로 분리하고 루트 저장소에는 사용했던 검색어 리스트를 저장하도록 변경했습니다.
    modules: { m1: module1 }
})

export default store;