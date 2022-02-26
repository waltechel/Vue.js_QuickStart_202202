<template>
  <div class="container">
    <div class="header">{{headerText}}</div>
    <div class="content">
      <!-- 슬롯을 이용해 부모 컴포넌트에서 자식 컴포넌트로 HTML 마크업을 전달할 수 있다. -->
      <slot></slot>
    </div>
    <div class="footer">{{footerText}}</div>
  </div>
</template>

<script>
export default {
  props: ["headerText", "footerText"]
};
</script>

<style scoped>
.container {
  width: 300px;
  margin: 10px;
  padding: 2px;
  border: solid 1px gray;
  float: left;
}
.header {
  padding: 4px 20px 4px 20px;
  background-color: orange;
  color: aqua;
  text-align: center;
}
.footer {
  padding: 4px 20px 4px 20px;
  background-color: aqua;
  text-align: left;
}
.content {
  padding: 10px;
  height: auto;
  min-height: 40px;
  text-align: left;
}
</style>