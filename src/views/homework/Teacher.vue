<template>
  <div>
    <h1 class="table">教师信息</h1>
    <el-table class="table" :data="tableData" style="width: 1000px">
      <el-table-column
        label="教师编号"
        prop="id"
        style="width: 150px"
      ></el-table-column>
      <el-table-column
        label="教师姓名"
        prop="name"
        style="width: 150px"
      ></el-table-column>
      <el-table-column
        label="毕业院校"
        prop="graduationSchool"
        style="width: 150px"
      ></el-table-column>
      <el-table-column
        label="职称"
        prop="title"
        style="width: 150px"
      ></el-table-column>
      <el-table-column
        label="教师账号"
        prop="userName"
        style="width: 150px"
      ></el-table-column>
      <el-table-column label=" " prop=" "></el-table-column>
      <el-table-column align="right">
        <template v-slot="scope">
          <el-button @click="query(scope.row.id)">查看详细</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template v-slot="scope">
          <el-button @click="query(scope.row.id)">修改信息</el-button>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template v-slot="scope">
          <el-button @click="query(scope.row.id)">删除信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="width: 500px">
      <h1 class="table">添加教师</h1>
      <div class="table">
        <el-form label-width="80px" style="margin: 0">
          <el-form-item label="教师姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="毕业院校">
            <el-input v-model="form.graduationSchool"></el-input>
          </el-form-item>
          <el-form-item label="职称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="初始密码">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="教师简介">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="form.detail"
            ></el-input>
          </el-form-item>
          <el-button id="button" type="primary" @click="submitForm(form)">
            提交
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, defineComponent, ref } from "vue";
import { Teacher } from "@/datasource/Types";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const tableData = computed(() => store.state.teachers);
    const form = ref<Teacher>({
      id: "",
      name: "",
      title: "",
      graduationSchool: "",
      userName: "",
      password: "",
      detail: "",
    });
    const change = (e: { $forceUpdate: () => void }) => {
      e.$forceUpdate();
    };
    const query = (id: string) => {
      tableData.value?.forEach((t) => {
        if (t.id == id) {
          alert(t.detail);
        }
      });
    };
    return {
      tableData,
      form,
      change,
      query,
    };
  },
});
</script>
<style scoped>
.table {
  margin: 30px 30px;
}
#button {
  margin: 0 10px;
  width: 100%;
}
</style>
