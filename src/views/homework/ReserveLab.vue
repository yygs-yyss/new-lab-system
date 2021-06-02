<template>
  <div id="id">
    <h1>实验室预约</h1>
    <div class="classroom">
      实验教室：
      <el-select v-model="number" filterable placeholder="请选择">
        <el-option
          v-for="(l, index) in classroomNumber"
          :key="index"
          :label="`丹青${l.id}`"
          :value="l.id"
        >
          丹青{{ l.id }}
        </el-option>
      </el-select>

      <el-button class="button" @click="query(classroom)">查询</el-button>
    </div>

    <div>
      <div class="classroom">
        起始周次：

        <el-select
          v-model="selectMessage.start"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="(l, index) in 18"
            :key="index"
            :label="`第${l}周`"
            :value="l"
          >
            第{{ l }}周
          </el-option>
        </el-select>
      </div>

      <div class="classroom">
        结束周次：
        <el-select v-model="selectMessage.end" filterable placeholder="请选择">
          <el-option
            v-for="(l, index) in 18"
            :key="index"
            :label="`第${l}周`"
            :value="l"
          >
            第{{ l }}周
          </el-option>
        </el-select>
      </div>

      <div class="classroom">
        课程节次：
        <el-select
          v-model="selectMessage.lesson"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="(l, index) in 7"
            :key="index"
            :label="`丹青${l.id}`"
            :value="`l.id`"
          >
            丹青{{ l.id }}
          </el-option>
        </el-select>
        <el-button class="button" @click="select(selectMessage)">
          选课
        </el-button>
      </div>
    </div>
    <table border="none">
      <tr>
        <th></th>
        <th>星期一</th>
        <th>星期二</th>
        <th>星期三</th>
        <th>星期四</th>
        <th>星期五</th>
        <th>星期六</th>
        <th>星期天</th>
      </tr>
      <tr>
        <td>第一节课</td>
        <td>
          <template v-for="(n, index) of classroomMessage" :key="index">
            <template v-if="n.lesson == '0101'">
              {{ n.courseName }}{{ n.start }}周-{{ n.end }}周{{
                n.teacherName
              }}&nbsq&nbsq{{ n.title }}
            </template>
          </template>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>第二节课</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>第三节课</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>第四节课</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>第五节课</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>
<script lang="ts">
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, defineComponent, Ref, ref } from "vue";
import axios from "axios";
import { ClassroomMessage, SelectMessage } from "@/datasource/Types";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const classroomNumber = computed(() => store.state.Labs);
    const number = ref<string>();
    const selectMessage = ref<SelectMessage>({
      id: "",
      start: 1,
      end: 1,
      lesson: "",
    });
    const classroomMessage = ref<ClassroomMessage[]>([
      {
        id: "901",
        start: 1,
        end: 9,
        teacherName: "y",
        lesson: "0101",
        courseName: "数据结构",
      },
    ]);

    const query = (number: string) => {
      const url = `http://localhost:8080/api/lab/${number}`;
      axios.get(url).then((resp) => {
        classroomMessage.value = resp.data;
      });
    };
    const select = (selectMessage: Ref<SelectMessage>) => {
      axios.get("http://localhost:8080/api/${Lab}").then((resp) => {
        classroomMessage.value = resp.data;
      });
    };
    return {
      classroomNumber,
      number,
      query,
      classroomMessage,
      selectMessage,
      select,
    };
  },
});
</script>
<style scoped>
#id {
  margin: 20px 30px;
  display: block;
}
.classroom {
  margin: 10px 0;
}
.button {
  margin: 0 10px;
}
</style>
