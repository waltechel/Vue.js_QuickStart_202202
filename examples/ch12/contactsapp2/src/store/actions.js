import Constant from '../Constant';
import axios from 'axios';
import CONF from '../Config'

export default {
    [Constant.CHANGE_ISLOADING]: (store, payload) => {
        store.commit(Constant.CHANGE_ISLOADING, payload);
    },
    [Constant.FETCH_CONTACTS]: (store, payload) => {
        let pageno;
        if (typeof payload === "undefined" || typeof payload.pageno === "undefined")
            pageno = 1;
        else
            pageno = payload.pageno;
        let pagesize = store.state.contactlist.pagesize;
        store.dispatch(Constant.CHANGE_ISLOADING, { isloading: true });
        axios.get(CONF.FETCH, {
            params: { pageno: pageno, pagesize: pagesize }
        }).then((response) => {
            store.commit(Constant.FETCH_CONTACTS, { contactlist: response.data });
            store.dispatch(Constant.CHANGE_ISLOADING, { isloading: false });
        })
    },
    [Constant.ADD_CONTACT]: (store) => {
        store.dispatch(Constant.CHANGE_ISLOADING, { isloading: true });
        axios.post(CONF.ADD, store.state.contact)
            .then((response) => {
                if (response.data.status === "success") {
                    store.dispatch(Constant.FETCH_CONTACTS, { pageno: 1 });
                } else {
                    console.log("연락처 추가 실패 : " + response.data);
                }
            })
    },
    [Constant.UPDATE_CONTACT]: (store) => {
        store.dispatch(Constant.CHANGE_ISLOADING, { isloading: true });
        let currentPageNo = store.state.contactlist.pageno;
        let contact = store.state.contact;
        axios.put(CONF.UPDATE.replace("${no}", contact.no), contact)
            .then((response) => {
                if (response.data.status === "success") {
                    store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo });
                } else {
                    console.log("연락처 변경 실패 : " + response.data)
                }
            })
    },
    [Constant.UPDATE_PHOTO]: (store, payload) => {
        store.dispatch(Constant.CHANGE_ISLOADING, { isloading: true });
        let currentPageNo = store.state.contactlist.pageno;
        let data = new FormData();
        data.append('photo', payload.file);
        axios.post(CONF.UPDATE_PHOTO.replace("${no}", payload.no), data)
            .then(() => {
                store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo });
            })
    },
    [Constant.DELETE_CONTACT]: (store, payload) => {
        store.dispatch(Constant.CHANGE_ISLOADING, { isloading: true });
        let currentPageNo = store.state.contactlist.pageno;
        axios.delete(CONF.DELETE.replace("${no}", payload.no))
            .then(() => {
                store.dispatch(Constant.FETCH_CONTACTS, { pageno: currentPageNo });
            })
    },
    [Constant.FETCH_CONTACT_ONE]: (store, payload) => {
        store.dispatch(Constant.CHANGE_ISLOADING, { isloading: true });
        axios.get(CONF.FETCH_ONE.replace("${no}", payload.no))
            .then((response) => {
                store.commit(Constant.FETCH_CONTACT_ONE, { contact: response.data });
                store.dispatch(Constant.CHANGE_ISLOADING, { isloading: false });
            })
    },
    [Constant.INITIALIZE_CONTACT_ONE]: (store) => {
        store.commit(Constant.INITIALIZE_CONTACT_ONE);
    }
}