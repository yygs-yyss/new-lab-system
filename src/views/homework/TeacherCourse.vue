<template>
  <el-table id="table" :data="tableData" style="width: 100%">
    <el-table-column label="课程名称" prop="courseName"></el-table-column>
    <el-table-column label="开课周次" prop="start"></el-table-column>
    <el-table-column label="结课周次" prop="end"></el-table-column>
    <el-table-column label="授课教师" prop="teacherName"></el-table-column>
    <el-table-column label="课程人数" prop="studentNumber"></el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
      </template>
      <router-link to="/homework/ReserveLab">
        <el-button>实验选课</el-button>
      </router-link>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, defineComponent } from "vue";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const tableData = computed(() => store.state.courseMessage);
    return {
      tableData,
    };
  },
});
</script>
<style scoped>
#table {
  margin: 30px 30px;
}
</style>
