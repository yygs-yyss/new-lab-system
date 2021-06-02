<template>
  <div class="img">
    <div align="center">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名">
          <el-input
            type="text"
            v-model="ruleForm.userName"
            @input="change($event)"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            @input="change($event)"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            type="primary"
            @click="submitForm(ruleForm)"
          >
            登录
          </el-button>
          {{ ruleForm.userName }}/{{ ruleForm.password }}
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { User } from "@/datasource/Types";
import store from "@/store";
import { LOGIN } from "@/store/VuexTypes";
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
  setup() {
    const form = { userName: "", password: "" };
    const ruleForm = ref<User>({ userName: "", password: "" });
    // const change = (e: { $forceUpdate: () => void }) => {
    //   e.$forceUpdate();
    // };
    const submitForm = (form: Ref) => {
      console.log(form);
      store.dispatch(LOGIN, ruleForm.value);
    };
    return {
      submitForm,
      ruleForm,
    };
  },
});
</script>
<style scoped>
.img {
  display: flex;
  background-size: cover;
  width: 1920px;
  height: 700px;
  background-attachment: fixed;
}
.demo-ruleForm {
  float: left;
  padding: 40px 90px 0 0;
  margin: 200px 500px;
  background: rgba(238, 234, 234, 0.8);
  border-radius: 3%;
}
</style>
