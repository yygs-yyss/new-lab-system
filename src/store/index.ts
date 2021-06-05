import { ActionTree, createStore, MutationTree } from "vuex";
import { Lab, CourseMessage, Teacher, UserLogin } from "@/datasource/Types";
import * as vxt from "@/store/VuexTypes";
import axios from "@/axios";
import { ResultVO } from "@/mock";

export interface State {
  agree: number;
  user: UserLogin;
  Labs?: Lab[];
  courseMessage: CourseMessage[];
  teachers?: Teacher[];
}
const myState: State = {
  agree: 0,
  user: {},
  Labs: [],
  courseMessage: [],

  teachers: [],
};
const myMutations: MutationTree<State> = {
  [vxt.UPDATE_COURSES]: (state, data: CourseMessage[]) =>
    (state.courseMessage = data),
  [vxt.LOGIN]: (state, data: any) => (state.user = data),
  [vxt.UPDATE_TEACHER]: (state, data: any) => (state.teachers = data),
  [vxt.UPDATE_LAB]: (state, data: Lab[]) => (state.Labs = data),
  [vxt.GET_TEACHER]: (state, data: Teacher[]) => (state.teachers = data),
};

const myActions: ActionTree<State, State> = {
  [vxt.LOGIN]: async ({ commit }, data: any) => {
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
  [vxt.GET_COURSES]: async ({ commit }) => {
    const resp = await axios.get<ResultVO>("/api/teacher/getCourse");
    console.log(resp);
    commit(vxt.UPDATE_COURSES, resp.data.data.courses);
  },
  [vxt.DEL_TEACHER]: async ({ commit }, id: number) => {
    const resp = await axios.delete<ResultVO>(`/api/admin/delete/${id}`);
    commit(vxt.UPDATE_TEACHER, resp.data.data.teachers);
  },
  [vxt.ADD_TEACHER]: async ({ commit }, teacher: Teacher) => {
    const resp = await axios.post<ResultVO>("/api/admin/add", teacher);
    commit(vxt.UPDATE_TEACHER, resp.data.data.teachers);
  },
  [vxt.ADD_LAB]: async ({ commit }, lab: Lab) => {
    const resp = await axios.post<ResultVO>("/api/admin/insertLab", lab);
    console.log(resp);
    commit(vxt.UPDATE_LAB, resp.data.data.lab);
  },
  [vxt.GET_LAB]: async ({ commit }) => {
    const resp = await axios.get<ResultVO>("/api/admin/allLab");
    commit(vxt.UPDATE_LAB, resp.data.data.lab);
  },
  [vxt.DEL_LAB]: async ({ commit }, id: string) => {
    console.log(id);
    const resp = await axios.delete<ResultVO>(`/api/admin/deleteLab/${id}`);
    console.log(resp);
    commit(vxt.UPDATE_LAB, resp.data.data.lab);
  },
  [vxt.GET_TEACHER]: async ({ commit }) => {
    const resp = await axios.get<ResultVO>("/api/admin/getUsers");
    commit(vxt.GET_TEACHER, resp.data.data.teachers);
  },
  [vxt.UPDATE_TEACHER]: async ({ commit }) => {
    const resp = await axios.get<ResultVO>("/api/admin/getUsers");
    commit(vxt.GET_TEACHER, resp.data.data.teachers);
  },
  [vxt.MODIFY_TEACHER]: async ({ commit }) => {
    const resp = await axios.patch<ResultVO>("/api/admin/Users");
    commit(vxt.GET_TEACHER, resp.data.data.teachers);
  },
  [vxt.ADD_COURSE]: async ({ commit }, course: CourseMessage) => {
    const resp = await axios.post<ResultVO>(
      "/api/teacher/insertCourse",
      course
    );
    commit(vxt.UPDATE_COURSES, resp.data.data.courses);
  },
  [vxt.DEL_COURSE]: async ({ commit }, id: string) => {
    const resp = await axios.delete<ResultVO>(
      `/api/teacher/deleteCourse/${id}`
    );
    commit(vxt.UPDATE_COURSES, resp.data.data.courses);
  },
};
export default createStore({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {},
});
