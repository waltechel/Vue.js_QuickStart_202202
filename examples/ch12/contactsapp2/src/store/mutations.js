import Constant from '../Constant';

//상태를 변경하는 기능만을 뽑아서...
export default {
    [Constant.FETCH_CONTACTS]: (state, payload) => {
        state.contactlist = payload.contactlist;
    },
    [Constant.FETCH_CONTACT_ONE]: (state, payload) => {
        state.contact = payload.contact;
    },
    [Constant.INITIALIZE_CONTACT_ONE]: (state) => {
        state.contact = { no: '', name: '', tel: '', address: '', photo: '' };
    },// isloading 상태 정보를 변경하는 변이 기능을 추가합니다.
    [Constant.CHANGE_ISLOADING]: (state, payload) => {
        state.isloading = payload.isloading;
    }
}