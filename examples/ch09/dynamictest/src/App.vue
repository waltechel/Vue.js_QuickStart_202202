<template>
  <div>
    <div class="header">
      <h1 class="headerText">(주) OpenSG</h1>
      <nav>
        <ul>
          <li>
            <a href="#" @click="changeMenu('home')">Home</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('about')">About</a>
          </li>
          <li>
            <a href="#" @click="changeMenu('contact')">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
    <!-- currentView 속성을 활용해 어느 컴포넌트를 보여줄지를 지정한다. -->
    <div class="container">
      <!-- keep-alive를 활용해서 정적 페이지라면 캐싱해서 사용한다. -->
      <!-- 특정 컴포넌트만 캐싱하거나 캐싱하고 싶지 않다면 include, exclude를 사용한다. -->
      <!-- include는 각 컴포넌트의 name 속성값을 가져온다. -->
      <keep-alive include="about,home">
        <component v-bind:is="currentView"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import Home from "./components/Home.vue"; 
import About from "./components/About.vue";
import Contact from "./components/Contact.vue";
export default {
  name: "App",
  components: { Home, About, Contact },
  data() {
    return { currentView: "home" };
  },
  methods: {
    changeMenu(view) {
      this.currentView = view;
    }
  }
};
</script>
<style scoped>
.header {
  background-color: aqua;
  padding: 10px 0px 0px 0px;
}
.headerText {
  padding: 0px 20px 0px 20px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: purple;
}
li {
  float: left;
}
li a {
  display: block;
  color: yellow;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover {
  background-color: aqua;
  color: black;
}
</style>