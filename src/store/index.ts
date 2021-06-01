import axios from "axios";
import { ActionTree, createStore, MutationTree } from "vuex";
import { Course } from "@/datasource/Types";
import * as vxt from "./VuexTypes";

export interface State {
  courses: Course[];
  exception: string;
  userCourses: Course[];
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
    if (token && token.length > 96) {
      sessionStorage.setItem("token", token);
      state.isLogin = true;
    }
  },
};
export default createStore({
  //state: {},
  mutations: {},
  actions: MyActions,
  modules: {},
});
