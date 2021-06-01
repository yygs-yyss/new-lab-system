<template>
  <div>
    <ul>
      <li v-for="(c, index) of courses" :key="index">{{ c.name }}</li>
    </ul>
    <div>1111</div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import { State } from "@/store";
import { GET_COURSES } from "@/store/VuexTypes";

export default defineComponent({
  setup() {
    const store = useStore<State>();
    store.dispatch(GET_COURSES);
    const courses = computed(() => store.state.courses);
    return {
      courses,
    };
  },
});
</script>
