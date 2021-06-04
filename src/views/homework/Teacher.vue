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
          <el-dialog title="教师信息" v-model="dialogVisible" center>
            <div class="word">
              {{ scope.row.name }}
            </div>

            <div class="word">{{ detail }}</div>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template v-slot="scope">
          <el-button @click="update(scope.row.id)">修改信息</el-button>
          <el-dialog title="教师信息" v-model="Visible" center>
            <div class="table">
              <el-form label-width="80px" style="margin: 0">
                <el-form-item label="教师姓名">
                  <el-input v-model="f.name"></el-input>
                </el-form-item>
                <el-form-item label="毕业院校">
                  <el-input v-model="f.graduationSchool"></el-input>
                </el-form-item>
                <el-form-item label="职称">
                  <el-input v-model="f.title"></el-input>
                </el-form-item>
                <el-form-item label="账号">
                  <el-input v-model="f.userName"></el-input>
                </el-form-item>
                <el-form-item label="初始密码">
                  <el-input v-model="f.password"></el-input>
                </el-form-item>
                <el-form-item label="教师简介">
                  <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="f.detail"
                  ></el-input>
                </el-form-item>
                <el-button id="button" type="primary" @click="submitForm(form)">
                  添加教师
                </el-button>
              </el-form>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template v-slot="scope">
          <el-button @click="del(scope.row.id)">删除信息</el-button>
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
          <el-button id="button" type="primary" @click="submitForm('form')">
            添加教师
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, defineComponent, Ref, ref } from "vue";
import { Teacher } from "@/datasource/Types";
import { ADD_TEACHER, DEL_TEACHER } from "@/store/VuexTypes";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const tableData = computed(() => store.state.teachers);
    const s = sessionStorage.getItem("token");
    const se = ref(s);
    const dialogVisible = ref(false);
    const detail = ref<string>();
    const Visible = ref(false);
    const f = ref<Teacher>({});
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
    const update = (id: string) => {
      store.state.teachers?.forEach((t) => {
        if (t.id == id) f.value = t;
      });
      Visible.value = true;
    };
    const query = (id: string) => {
      //dialogVisible.value = true;
      setTimeout(() => {
        dialogVisible.value = true;
      }, 300);
      tableData.value?.forEach((t) => {
        //alert(t.id + " " + id);
        if (t.id == id) {
          detail.value = t.detail;
        }
      });
    };
    const del = (id: string) => {
      store.dispatch(DEL_TEACHER, id);
    };
    const submitForm = (R: Ref<Teacher>) => {
      alert(R.value);
      store.dispatch(ADD_TEACHER, R.value);
    };
    return {
      tableData,
      form,
      change,
      query,
      dialogVisible,
      detail,
      submitForm,
      se,
      update,
      del,
      Visible,
      f,
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
.word {
  font-size: 20px;
}
</style>
