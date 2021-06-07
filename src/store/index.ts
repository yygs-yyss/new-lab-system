import { ActionTree, createStore, MutationTree } from "vuex";
import {
  Lab,
  CourseMessage,
  Teacher,
  UserLogin,
  User,
  SelectMessage,
  ClassroomMessage,
} from "@/datasource/Types";
import * as vxt from "@/store/VuexTypes";
import axios from "@/axios";
import { ResultVO } from "@/mock";

export interface State {
  agree: number; //登录不同页面后的渲染
  user: UserLogin; //新创建的用户
  Labs?: Lab[]; //实验室信息
  courseMessage: CourseMessage[]; //课程信息
  classroomMessage: ClassroomMessage[]; //预约教室信息
  teachers?: Teacher[]; //老师信息
  name: string; //实验选课选中后的课程，将设为预约里的默认课程
  id: number[]; //基于人数搜索教室返回的教室号
}
const myState: State = {
  agree: 0,
  user: {},
  Labs: [],
  courseMessage: [],
  classroomMessage: [],
  name: "",
  teachers: [],
  id: [],
};
const myMutations: MutationTree<State> = {
  [vxt.UPDATE_COURSES]: (state, data: CourseMessage[]) =>
    (state.courseMessage = data),
  [vxt.LOGIN]: (state, data: User) => (state.user = data),
  [vxt.UPDATE_TEACHER]: (state, data: Teacher[]) => (state.teachers = data),
  [vxt.UPDATE_LAB]: (state, data: Lab[]) => (state.Labs = data),
  [vxt.GET_TEACHER]: (state, data: Teacher[]) => (state.teachers = data),
  [vxt.UPDATE_ID]: (state, data: number[]) => (state.id = data),
  [vxt.UPDATE_LABMESSAGE]: (state, data: CourseMessage[]) =>
    (state.classroomMessage = data),
  [vxt.UPDATE_CLASSMESSAGE]: (state, data: ClassroomMessage[]) =>
    (state.classroomMessage = data),
};

//<------------------------------------------------------------------------------------------------------------------>

const myActions: ActionTree<State, State> = {
  //用户登录请求，登录成功跳转对应页面，失败则弹出错误提示
  [vxt.LOGIN]: async ({ commit }, data: User) => {
    console.log(data);
    const resp = await axios.post<ResultVO>("/api/login", data);
    if (resp.data.code == 401) {
      alert("用户名或密码错误");
    }
    sessionStorage.setItem("token", resp.headers.token);
    console.log(resp);
    commit(vxt.LOGIN, resp.data.data);
    return Promise.resolve(resp.data.data.user);
  },

  //管理员端<----------------------------------------------------------------->

  //获取所有用户信息
  [vxt.GET_TEACHER]: async ({ commit }) => {
    const resp = await axios.get<ResultVO>("/api/admin/getUsers");
    commit(vxt.GET_TEACHER, resp.data.data.teachers);
  },
  // 获取老师信息
  [vxt.UPDATE_TEACHER]: async ({ commit }) => {
    const resp = await axios.get<ResultVO>("/api/admin/getUsers");
    commit(vxt.GET_TEACHER, resp.data.data.teachers);
  },
  //添加老师
  [vxt.ADD_TEACHER]: async ({ commit }, teacher: Teacher) => {
    const resp = await axios.post<ResultVO>("/api/admin/add", teacher);
    commit(vxt.UPDATE_TEACHER, resp.data.data.teachers);
  },
  // 修改老师信息
  [vxt.MODIFY_TEACHER]: async ({ commit }, teacher: Teacher) => {
    const resp = await axios.patch<ResultVO>("/api/admin/Users", teacher);
    commit(vxt.GET_TEACHER, resp.data.data.teachers);
  },
  //基于教师id删除某一教师用户
  [vxt.DEL_TEACHER]: async ({ commit }, id: number) => {
    const resp = await axios.delete<ResultVO>(`/api/admin/delete/${id}`);
    commit(vxt.UPDATE_TEACHER, resp.data.data.teachers);
  },
  //获取所有实验室信息
  [vxt.GET_LAB]: async ({ commit }) => {
    const resp = await axios.get<ResultVO>("/api/admin/allLab");
    commit(vxt.UPDATE_LAB, resp.data.data.lab);
  },
  //添加实验室
  [vxt.ADD_LAB]: async ({ commit }, lab: Lab) => {
    const resp = await axios.post<ResultVO>("/api/admin/insertLab", lab);
    console.log(resp);
    commit(vxt.UPDATE_LAB, resp.data.data.lab);
  },
  //删除实验室
  [vxt.DEL_LAB]: async ({ commit }, id: string) => {
    console.log(id);
    const resp = await axios.delete<ResultVO>(`/api/admin/deleteLab/${id}`);
    console.log(resp);
    commit(vxt.UPDATE_LAB, resp.data.data.lab);
  },

  //教师端<--------------------------------------------------------------------->

  //基于请求中的教师自带的uid 获取教授课程信息
  [vxt.GET_COURSES]: async ({ commit }) => {
    const resp = await axios.get<ResultVO>("/api/teacher/getCourse");
    console.log(resp);
    commit(vxt.UPDATE_COURSES, resp.data.data.courses);
  },
  //添加课程
  [vxt.ADD_COURSE]: async ({ commit }, course: CourseMessage) => {
    const resp = await axios.post<ResultVO>(
      "/api/teacher/insertCourse",
      course
    );
    commit(vxt.UPDATE_COURSES, resp.data.data.courses);
  },
  //基于id删除课程
  [vxt.DEL_COURSE]: async ({ commit }, id: string) => {
    const resp = await axios.delete<ResultVO>(
      `/api/teacher/deleteCourse/${id}`
    );
    commit(vxt.UPDATE_COURSES, resp.data.data.courses);
  },
  //基于学生数量获取能容纳该数量的教室号
  [vxt.GET_LABBYNUMBER]: async ({ commit }, number: number) => {
    const resp = await axios.get<ResultVO>(`/api/getLab/${number}`);
    commit(vxt.UPDATE_ID, resp.data.data.id);
  },
  //基于实验室编号获取预约信息
  [vxt.GET_LABMESSAGE]: async ({ commit }, number: string) => {
    const resp = await axios.get<ResultVO>(`/api/classMessage/${number}`);
    console.log(resp);
    commit(vxt.UPDATE_LABMESSAGE, resp.data.data.message);
  },
  //添加预约信息
  [vxt.ADD_COURSEMESSAGE]: async ({ commit }, message: SelectMessage) => {
    console.log(1);
    const resp = await axios.post<ResultVO>(
      `/api/classMessage/insert`,
      message
    );
    console.log(1);
    console.log(resp);
    commit(vxt.UPDATE_LABMESSAGE, resp.data.data.message);
  },
};
export default createStore({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {},
});
