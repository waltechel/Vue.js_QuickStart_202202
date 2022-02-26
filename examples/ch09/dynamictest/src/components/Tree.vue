<template>
  <!-- 재귀 컴포넌트 : 템플릿에서 자기 자신을 호출하는 컴포넌트 -->
  <ul>
    <li v-for="s in subs" v-bind:class="s.type" :key="s.name">
      {{s.name}}
      <!-- 재귀 참조를 위해서 tree 컴포넌트에서 tree 컴포넌트를 활용합니다. -->
      <tree :subs="s.subs"></tree>
    </li>
  </ul>
</template>

<script>
export default {
  name: "tree",
  props: ["subs"]
};
</script>