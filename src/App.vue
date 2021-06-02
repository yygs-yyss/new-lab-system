<template>
  <login></login>
  <h></h>
  <div id="id">
    <sidebar></sidebar>
    <router-view key="$route.path"></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import sidebar from "@/views/homework/Sidebar.vue";
import h from "@/views/homework/Head.vue";
import login from "@/views/homework/Login.vue";
// import pr from "@/views/homework/practice.vue";
// import sidebarAdmin from "@/views/homework/sidebarAdmin.vue";
export default defineComponent({
  components: { sidebar, h },
  //components: { login }
});
</script>

<style>
#id {
  display: flex;
}
</style>
