<template>
  <div id="id">
    <h1>实验室预约</h1>
    <div class="classroom">
      实验教室：
      <el-select v-model="number" filterable placeholder="请选择">
        <el-option
          v-for="(l, index) in id"
          :key="index"
          :label="`丹青${l}`"
          :value="l"
        >
          丹青{{ l }}
        </el-option>
      </el-select>

      <el-button class="button" @click="query(number)">查询</el-button>
    </div>

    <div>
      <div class="classroom">
        实验课程：

        <el-select
          v-model="selectMessage.courseName"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="(l, index) in course"
            :key="index"
            :label="l.courseName"
            :value="l.courseName"
          >
            {{ l.courseName }}
          </el-option>
        </el-select>
      </div>
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
          <template v-for="(l, index) of 7" :key="index">
            <el-option
              v-for="(r, index) in 5"
              :key="index"
              :label="`周${l}第${r}节课`"
              :value="`0${l}0${r}`"
            >
              周{{ l }}第{{ r }}节课
            </el-option>
          </template>
        </el-select>
        <el-button class="button" @click="select">选课</el-button>
      </div>
    </div>
    <div class="table">
      <table border="10px solid black">
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
                {{ n.courseName }}--{{ n.start }}周-{{ n.end }}周--{{
                  n.teacherName
                }}{{ n.title }}
              </template>
              <br />
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
  </div>
</template>
<script lang="ts">
import { State } from "@/store";
import { Store, useStore } from "vuex";
import { computed, defineComponent, Ref, ref } from "vue";
import axios from "axios";
import { ClassroomMessage, SelectMessage } from "@/datasource/Types";
import { useRoute } from "vue-router";
import { ADD_COURSEMESSAGE, GET_LABMESSAGE } from "@/store/VuexTypes";

export default defineComponent({
  setup() {
    const store: Store<State> = useStore();
    const classroomNumber = computed(() => store.state.Labs);
    const number = ref<string>();
    const course = computed(() => store.state.courseMessage);
    const u = store.state.name;
    const id = computed(() => store.state.id);
    const selectMessage = ref<SelectMessage>({});
    selectMessage.value.courseName = u;
    selectMessage.value.labId = computed(
      () => number.value
    ) as unknown as string;
    const classroomMessage = computed(() => store.state.classroomMessage);
    const query = (number: number) => {
      store.dispatch(GET_LABMESSAGE, number);
    };
    const select = () => {
      store.dispatch(ADD_COURSEMESSAGE, selectMessage.value);
    };
    return {
      classroomNumber,
      number,
      query,
      classroomMessage,
      selectMessage,
      select,
      course,
      id,
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
.table {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
