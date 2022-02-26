import Vue from 'vue';
// 이벤트버스 객체 만들기
// 아무 기능이 없는 비어 있는 Vue 인스턴스를 생성해서 export하면 됩니다.
var vm = new Vue({
    name: "EventBus"
});

export default vm;