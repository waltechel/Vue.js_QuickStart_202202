<template>
  <div id="app">
    <div class="container">
      <div class="form-group">
        <button @click="fetchContacts">1페이지 연락처 조회</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="name" placeholder="이름을 입력합니다" />
        <input type="text" v-model="tel" placeholder="전화번호를 입력합니다" />
        <input type="text" v-model="address" placeholder="주소를 입력합니다" />
        <button @click="addContact">연락처 1건 추가</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="no" />
        <button @click="fetchContactOne">연락처 1건 조회</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="no" />
        <input type="text" v-model="name" placeholder="이름을 입력합니다" />
        <input type="text" v-model="tel" placeholder="전화번호를 입력합니다" />
        <input type="text" v-model="address" placeholder="주소를 입력합니다" />
        <button @click="updateContact">수정</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="no" />
        <button @click="deleteContact">삭제</button>
      </div>
      <div class="form-group">
        <input type="text" v-model="no" />
        <!-- 해당 필드를 직접 참조하기 위해서 ref 추가합니다. -->
        <input type="file" ref="photofile" name="photo" />
        <button @click="changePhoto">파일 변경</button>
      </div>
    </div>
    <span>JSON 출력</span>
    <div id="result" class="container">
      <xmp>{{result}}</xmp>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      no: 0,
      name: "",
      tel: "",
      address: "",
      result: null
    };
  },
  methods: {
    fetchContacts() {
      this.$axios({
        method: "GET",
        url: "/api/contacts",
        params: { pageno: 1, pagesize: 5 }
      })
        // axios의 then은 화살표함수를 사용하는 것이 좋다.
        .then(response => {
          // 여기서의 this.result는 AppAxiosTest.vue 객체를 말한다.
          // 화살표함수를 사용하지 않으면 this가 Vue 인스턴스를 참조하지 않기 떄문에 별도의 변수에 this를 할당한 후에
          // 클로저 방식으로 적용해야 하는 불편함이 발생한다.
          console.log(response);
          this.result = response.data;
        })
        .catch(ex => {
          console.log("ERROR!!!! : ", ex);
        });
    },
    addContact() {
      this.$axios
        .post("/api/contacts", {
          name: this.name,
          tel: this.tel,
          address: this.address
        })
        .then(response => {
          console.log(response);
          this.result = response.data;
          this.no = response.data.no;
        })
        .catch(ex => {
          console.log("ERROR!!!! : ", ex);
        });
    },
    fetchContactOne() {
      this.$axios.get("/api/contacts/" + this.no).then(response => {
        console.log(response);
        this.result = response.data;
      });
    },
    updateContact() {
      this.$axios
        .put("/api/contacts/" + this.no, {
          name: this.name,
          tel: this.tel,
          address: this.address
        })
        .then(response => {
          console.log(response);
          this.name = "";
          this.tel = "";
          this.address = "";
          this.result = response.data;
        })
        .catch(ex => {
          console.log("ERROR!!!! : ", ex);
        });
    },
    deleteContact() {
      this.$axios
        .delete("/api/contacts/" + this.no)
        .then(response => {
          console.log(response);
          this.no = 0;
          this.result = response.data;
        })
        .catch(ex => {
          console.log("ERROR!!!! : ", ex);
        });
    },
    changePhoto() {
      let data = new FormData();
      let file = this.$refs.photofile.files[0];
      data.append("photo", file);
      this.$axios
        .post("/api/contacts/" + this.no + "/photo", data)
        .then(response => {
          this.result = response.data;
        })
        .catch(ex => {
          console.log("updatePhoto failed", ex);
        });
    }
  }
};
</script>

<style>
@import url("https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  border: solid 1px gray;
  padding: 10px;
  margin-bottom: 10px;
  text-align: left;
}
#result {
  text-align: left;
  padding: 20px;
  border: solid 1px black;
}
.form-group {
  border: dashed 1px gray;
  padding: 5px 5px 5px 20px;
}
</style>