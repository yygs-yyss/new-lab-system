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
          <el-button @click="query(scope.row.id)" type="primary">
            查看详细
          </el-button>
          <el-dialog title="教师信息" v-model="dialogVisible" center>
            <div class="word" v-if="dialogVisible">
              {{ msg }}
            </div>

            <div class="word">{{ detail }}</div>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template v-slot="scope">
          <el-button @click="update(scope.row.id)" type="warning">
            修改信息
          </el-button>
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
                <el-button id="button" type="primary" @click="updateForm">
                  修改信息
                </el-button>
              </el-form>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template v-slot="scope">
          <el-button @click="del(scope.row.id)" type="danger">
            删除信息
          </el-button>
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
          <el-button id="button" type="primary" @click="submitForm()">
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
import { ADD_TEACHER, DEL_TEACHER, MODIFY_TEACHER } from "@/store/VuexTypes";

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
    const msg = ref<string>();
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
      const te = ref<Teacher>({});
      store.state.teachers?.forEach((t) => {
        if (t.id == id) te.value = t;
      });
      f.value = te.value;
      Visible.value = true;
    };
    const query = (id: string) => {
      //dialogVisible.value = true;
      let flag = 0;
      setTimeout(() => {
        dialogVisible.value = true;
      }, 300);
      tableData.value?.forEach((t) => {
        //alert(t.id + " " + id);
        if (t.id == id && flag == 0) {
          detail.value = t.detail;
          msg.value = t.name;
          flag = 1;
        }
      });
    };
    const del = (id: string) => {
      const firm = confirm("此操作将永久删除该信息, 是否继续?");
      if (firm == true) {
        store.dispatch(DEL_TEACHER, id);
      }
    };
    const submitForm = () => {
      store.dispatch(ADD_TEACHER, form.value);
    };
    const updateForm = () => {
      const firm = confirm("此操作将永久修改该信息, 是否继续?");
      if (firm == true) {
        store.dispatch(MODIFY_TEACHER, f.value);
        Visible.value = false;
      }
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
      updateForm,
      msg,
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
