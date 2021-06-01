<template>
  <div>
    <div>{{ msg }}</div>
    <div>
      <input v-model="user.number" />
      <br />
      <input v-model="user.password" />
      <br />
      <button @click="login">login</button>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, ref, watch } from "vue";
import { State } from "@/store";
import { LOGIN } from "@/store/VuexTypes";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const msg = ref("");
    const router = useRouter();
    const user = ref({ number: "", password: "" });
    const store = useStore<State>();
    // vuex返回promise对象。即不是所有数据都需要挂在state上
    //store.dispatch(BACKEND_WELCOME).then(data => (msg.value = data.messages));
    const login = () => {
      store.dispatch(LOGIN, user.value);
      if (!store.state.isLogin) {
        alert("000");
      }
    };
    watch(user, () => {
      if (store.state.isLogin) {
        router.push("/home");
      }
    });
    return {
      msg,
      user,
      login,
    };
  },
});
</script>
