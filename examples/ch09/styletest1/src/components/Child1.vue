<template>
  <div class="main test">
    {{msg}}
    <child11 />
    {{msg}}
  </div>
</template>
<script>
import Child11 from "./Child11.vue";

export default {
  name: "child1",
  components: { Child11 },
  data() {
    return {
      msg: "Child1"
    };
  }
};
</script>
<style scoped>
/* 스타일 부분만 child2.vue와 다르다 */
.main {
  border: solid 1px black;
  background-color: yellow;
}
</style>