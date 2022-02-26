<template>
  <div class="main">{{msg}}</div>
</template>
<script>
export default {
  name: "child2",
  data() {
    return {
      msg: "Child2"
    };
  }
};
</script>
<style scoped>
/* 스타일 부분만 Child2와 다르다 */
.main {
  border: solid 1px black;
  background-color: aqua;
}
</style>