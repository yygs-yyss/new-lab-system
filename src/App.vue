<template>
  <login v-if="agree == 0"></login>
  <h v-if="agree != 0"></h>
  <div id="id">
    <sidebarAdmin v-if="agree == 1"></sidebarAdmin>
    <sidebar v-if="agree == 2"></sidebar>
    <router-view v-if="agree != 0" key="$route.path"></router-view>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import sidebar from "@/views/homework/Sidebar.vue";
import h from "@/views/homework/Head.vue";
import login from "@/views/homework/Login.vue";
// import pr from "@/views/homework/practice.vue";
import sidebarAdmin from "@/views/homework/sidebarAdmin.vue";
import { State } from "./store";
import { Store, useStore } from "vuex";
export default defineComponent({
  components: { sidebar, h, login, sidebarAdmin },
  setup() {
    const store: Store<State> = useStore();
    const agree = computed(() => store.state.agree);
    return {
      agree,
    };
  },
});
</script>

<style>
#id {
  display: flex;
}
</style>
