import Vue from 'vue';
import Vuex from 'vuex';
import Constant from '../Constant';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        contacts: []
    },
    mutations: {
        [Constant.SEARCH_CONTACT]: (state, payload) => {
            state.contacts = payload.contacts;
        }
    },
    actions: {
        // promise 패턴 대신 async~await를 사용해도 상관없습니다.
        async [Constant.SEARCH_CONTACT](store, payload) {
            let response = await axios.get(Constant.BASE_URL + payload.name);
            store.commit(Constant.SEARCH_CONTACT, { contacts: response.data })
        }
        // [Constant.SEARCH_CONTACT] : (store, payload)=> {
        //     axios.get(Constant.BASE_URL + payload.name)
        //     .then((response)=> {
        //         store.commit(Constant.SEARCH_CONTACT, { contacts: response.data })
        //     })
        // }
    }
})

export default store;