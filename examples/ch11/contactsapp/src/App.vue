<template>
  <div id="container">
    <div class="page-header">
      <h1 class="text-center">연락처 관리 애플리케이션</h1>
      <p>(Dynamic Component + Vuex + Axios)</p>
    </div>
    <component :is="currentView"></component>
    <contactList></contactList>
  </div>
</template>

<script>
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";
import UpdatePhoto from "./components/UpdatePhoto";

import { mapState } from "vuex";

export default {
  name: "app",
  // 직접 ContactForm 컴포넌트를 참조하여 사용하였다.
  components: { ContactList, ContactForm, UpdatePhoto },
  // data 옵션 대신에 계산형 속성이 추가되었다.
  computed: mapState(["currentView"])
};
</script>

<style scoped>
#container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>