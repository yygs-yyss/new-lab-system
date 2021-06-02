<template>
  <div>
    <h1 class="table">已开实验室</h1>
    <div style="width: 1000px">
      <el-table class="table" :data="tableData" style="width: 100%">
        <el-table-column label="实验室编号" prop="id"></el-table-column>
        <el-table-column label="机器数量" prop="number"></el-table-column>
        <el-table-column label="描述" prop="detail"></el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
              @input="change($event)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="width: 500px">
      <h1 class="table">添加实验室</h1>
      <div class="table">
        <el-form label-width="100px" style="margin: 0 -13px">
          <el-form-item label="实验室编号">
            <el-input v-model="form.id" @input="change($event)"></el-input>
          </el-form-item>

          <el-form-item label="机器数量">
            <el-input v-model="form.number" @input="change($event)"></el-input>
          </el-form-item>
          <el-form-item label="实验室描述">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="form.detail"
              @input="change($event)"
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
import { computed, defineComponent, Ref, ref } from "vue";
import { Lab } from "@/datasource/Types";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const tableData = computed(() => store.state.Labs);
    const form = ref<Lab>({
      id: "",
      number: 0,
      detail: ""
    });
    const submitForm = (form: Ref) => {
      console.log(form);
    };
    return {
      tableData,
      form,
      submitForm
    };
  },
  methods: {
    change(e: { $forceUpdate: () => void }) {
      e.$forceUpdate();
    }
  }
});
</script>
<style scoped>
.table {
  margin: 30px 30px;
}
#button {
  margin: 11px;
  width: 100%;
}
</style>
