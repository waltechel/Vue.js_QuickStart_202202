import Vue from 'vue';
import Vuex from 'vuex';
import Constant from '../Constant';
// lodash를 활용한 프로젝트
import _ from 'lodash';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        currentRegion: "all",
        countries: [
            { no: 1, name: "미국", capital: "워싱턴DC", region: "america" },
            { no: 2, name: "프랑스", capital: "파리", region: "europe" },
            { no: 3, name: "영국", capital: "런던", region: "europe" },
            { no: 4, name: "중국", capital: "베이징", region: "asia" },
            { no: 5, name: "태국", capital: "방콕", region: "asia" },
            { no: 6, name: "모로코", capital: "라바트", region: "africa" },
            { no: 7, name: "라오스", capital: "비엔티안", region: "asia" },
            { no: 8, name: "베트남", capital: "하노이", region: "asia" },
            { no: 9, name: "피지", capital: "수바", region: "oceania" },
            { no: 10, name: "솔로몬 제도", capital: "호니아라", region: "oceania" },
            { no: 11, name: "자메이카", capital: "킹스턴", region: "america" },
            { no: 12, name: "나미비아", capital: "빈트후크", region: "africa" },
            { no: 13, name: "동티모르", capital: "딜리", region: "asia" },
            { no: 14, name: "멕시코", capital: "멕시코시티", region: "america" },
            { no: 15, name: "베네수엘라", capital: "카라카스", region: "america" },
            { no: 16, name: "서사모아", capital: "아피아", region: "oceania" }
        ]
    },
    getters: {
        // 국가 정보와 현재의 지역명을 이용해 특정 지역의 국가 정보만을 필터링해 새로운 배열을 만들어 리턴합니다.
        countriesByRegion(state) {
            if (state.currentRegion === "all") {
                return state.countries;
            } else {
                return state.countries.filter(c => c.region === state.currentRegion);
            }
        },
        // 중복 지역명을 제거한 지역명 리스트 정보를 만들어냅니다.
        regions(state) {
            let temp = state.countries.map((c) => c.region);
            temp = _.uniq(temp);
            // 모든 국가 정보를 볼 수 있는 all을 배열의 첫 번쨰 위치에 삽입하여 리턴합니다.
            temp.splice(0, 0, "all");
            return temp;
        },
        currentRegion(state) {
            return state.currentRegion;
        }
    },
    mutations: {
        [Constant.CHANGE_REGION]: (state, payload) => {
            state.currentRegion = payload.region;
        }
    }
})

export default store;