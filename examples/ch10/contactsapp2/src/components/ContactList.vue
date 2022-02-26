<template>
  <div>
    <p class="addnew">
      <button class="btn btn-primary" @click="addContact()">새로운 연락처 추가하기</button>
    </p>
    <div id="example">
      <table id="list" class="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>이름</th>
            <th>전화번호</th>
            <th>주소</th>
            <th>사진</th>
            <th>편집/삭제</th>
          </tr>
        </thead>
        <tbody id="contacts">
          <tr v-for="contact in contactlist.contacts" :key="contact.no">
            <td>{{contact.name}}</td>
            <td>{{contact.tel}}</td>
            <td>{{contact.address}}</td>
            <td>
              <img class="thumbnail" :src="contact.photo" @click="editPhoto(contact.no)" />
            </td>
            <td>
              <button class="btn btn-primary" @click="editContact(contact.no)">편집</button>
              <button class="btn btn-primary" @click="deleteContact(contact.no)">삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <paginate
      ref="pagebuttons"
      :page-count="totalpage"
      :page-range="7"
      :margin-pages="3"
      :click-handler="pageChanged"
      :prev-text="'이전'"
      :next-text="'다음'"
      :container-class="'pagination'"
      :page-class="'page-item'"
    ></paginate>
  </div>
</template>

<script>
import eventBus from "../EventBus";
// 페이징 기능 제공을 위해 vuejs-pagenate 기능을 활용하였다.
import Paginate from "vuejs-paginate";

export default {
  name: "contactList",
  components: { Paginate },
  //   상위 컴포넌트로부터 props를 통해 전달받은 데이터를 화면에 나타내기만 한다.
  // 이런 컴포넌트는 상태가 없는 컴포넌트(data 없는 컴포넌트)라고 한다.
  props: ["contactlist"],
  computed: {
    // 전체 페이지 개수를 이용할 수 있도록 계산형 속성을 사용한다.
    totalpage() {
      return (
        Math.floor(
          (this.contactlist.totalcount - 1) / this.contactlist.pagesize
        ) + 1
      );
    }
  },
  // 관찰 속성을 이용하여 직접 선택된 페이지 번호를 변경해주어야 한다.
  watch: {
    ["contactlist.pageno"]() {
      this.$refs.pagebuttons.selected = this.contactlist.pageno - 1;
    }
  },
  methods: {
    // 페이지가 바뀜을 알리는 이벤트
    pageChanged(page) {
      eventBus.$emit("pageChanged", page);
    },
    // 새 연락처 추가 이벤트
    addContact() {
      eventBus.$emit("addContactForm");
    },
    // 연락처 수정 이벤트
    editContact(no) {
      eventBus.$emit("editContactForm", no);
    },
    // 연락처 삭제 이벤트
    deleteContact(no) {
      if (confirm("정말로 삭제하시겠습니까?") === true) {
        eventBus.$emit("deleteContact", no);
      }
    },
    // 사진 수정 이벤
    editPhoto(no) {
      eventBus.$emit("editPhoto", no);
    }
  }
};
</script>

<style scoped>
.addnew {
  margin: 10px auto;
  max-width: 820px;
  min-width: 820px;
  padding: 40px 0px 0px 0px;
  text-align: left;
}
#example {
  margin: 10px auto;
  max-width: 820px;
  min-width: 820px;
  padding: 0px;
  position: relative;
  font: 13px "verdana";
}
#example .long {
  width: 100%;
}
#example .short {
  width: 50%;
}
#example input,
textarea,
select {
  box-sizing: border-box;
  border: 1px solid #bebebe;
  padding: 7px;
  margin: 0px;
  outline: none;
}
#list {
  width: 800px;
  font: 13px "verdana";
}
#list thead tr {
  color: yellow;
  background-color: purple;
}
#list th:nth-child(5n + 1),
#list td:nth-child(5n + 1) {
  width: 200px;
}
#list th:nth-child(5n + 2),
#list td:nth-child(5n + 2) {
  width: 150px;
}
#list th:nth-child(5n + 3),
#list td:nth-child(5n + 3) {
  width: 250px;
}
#list th:nth-child(5n + 4),
#list td:nth-child(5n + 4) {
  width: 60px;
}
#list th:nth-child(5n),
#list td:nth-child(5n) {
  width: 150px;
}
#list th {
  padding: 10px 5px 10px 5px;
}
#list tr {
  border-bottom: solid 1px black;
}
#list td,
#list th {
  text-align: center;
  vertical-align: middle;
}
img.thumbnail {
  width: 48px;
  height: 48px;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  cursor: pointer;
}
</style>