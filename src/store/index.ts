import axios from "axios";
import { ActionTree, createStore, MutationTree } from "vuex";
import { Course, User } from "@/datasource/Types";
import * as vxt from "./VuexTypes";

export interface State {
  courses: Course[];
  exception: string;
  userCourses: Course[];
  User: User;
  Users: User[];
  // Integrating with backend
  isLogin: boolean;
}

const MyActions: ActionTree<State, State> = {
  [vxt.GET_COURSES]: async ({ state }) => {
    const resp = await axios.get("/api/course/getCourse");
    console.log(resp.data.data.courses);
    state.courses = resp.data.data.courses;
  },
  [vxt.LOGIN]: async ({ state }, user: any) => {
    const resp = await axios.post("/api/login", user);
    const token: string = resp.headers.token;
    console.log(token);
    console.log(resp);
    if (token && token.length > 96) {
      localStorage.setItem("user", user);
      localStorage.setItem("token", token);
      state.isLogin = true;
      return Promise.resolve(resp.data.data.user);
    }
  },
  [vxt.GETUSERS]: async ({ state }) => {
    const resp = await axios.get("/api/admin/getUsers");
    console.log(resp.data.data.teachers);
    state.Users = resp.data.data.teachers;
  },
  [vxt.GETCOURSEBYNAME]: async ({ state }) => {
    const resp = await axios.post("/api/teacher/getCourseByName", "BO");
    console.log(resp.data.data);
    console.log(resp);
  },
};
export default createStore({
  //state: {},
  mutations: {},
  actions: MyActions,
  modules: {},
});
