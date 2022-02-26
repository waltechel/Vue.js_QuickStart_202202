<template>
  <div>
    <hr class="divider" />
    <div>
      <table class="detail table table-bordered">
        <tbody>
          <tr class="active">
            <td>일련번호</td>
            <td>{{contact.no}}</td>
          </tr>
          <tr class="active">
            <td>이름</td>
            <td>{{contact.name}}</td>
          </tr>
          <tr class="active">
            <td>전화</td>
            <td>{{contact.tel}}</td>
          </tr>
          <tr class="active">
            <td>주소</td>
            <td>{{contact.address}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import contactlist from "../ContactList";
export default {
  name: "contactbyno",
  data() {
    return {
      no: 0,
      contacts: contactlist.contacts
    };
  },
  created() {
    this.no = parseInt(this.$route.params.no, 10);
  },
  watch: {
    // $route 속성에 대해 관찰을 수행합니다.
    $route(to) {
      this.no = parseInt(to.params.no, 10);
    }
  },
  computed: {
    contact() {
      return this.contacts.find(item => item.no === this.no);
    }
  }
};
</script>

<style>
.divider {
  height: 3px;
  margin-left: auto;
  margin-right: auto;
  background-color: #ff0066;
  color: #ff0066;
  border: 0 none;
}
table.detail {
  width: 400px;
}
</style>