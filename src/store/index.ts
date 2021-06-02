import { ActionTree, createStore, MutationTree } from "vuex";
import {
  Lab,
  CourseMessage,
  Teacher,
  UserLogin,
  User,
} from "@/datasource/Types";
import * as vxt from "@/store/VuexTypes";
import axios from "axios";
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
  Labs: [
    { id: "901", number: 100, detail: "" } as Lab,
    { id: "902", number: 100, detail: "" } as Lab,
    { id: "903", number: 100, detail: "" } as Lab,
    { id: "904", number: 100, detail: "" } as Lab,
  ],
  courseMessage: [],

  teachers: [
    {
      id: "1",
      name: "bwhyman",
      title: "讲师",
      graduationSchool: "东北林业大学",
      userName: "2046204600",
      password: "123456",
      detail: "软件工程专业教师",
    },
  ],
};
const myMutations: MutationTree<State> = {
  [vxt.UPDATE_COURSES]: (state, data: CourseMessage[]) =>
    (state.courseMessage = data),
  [vxt.LOGIN]: (state, data: any) => (state.user = data),
};
const myActions: ActionTree<State, State> = {
  [vxt.LOGIN]: async ({ commit }, data: any) => {
    console.log(data);
    const resp = await axios.post<ResultVO>("/api/login", data);
    if (resp.data.code == 401) {
      alert("用户名或密码错误");
    }
    console.log(resp);
    commit(vxt.LOGIN, resp.data.data);
    return Promise.resolve(resp.data.data.user);
  },
  [vxt.GET_COURSES]: async ({ commit }, user: User) => {
    console.log(user);
    const resp = await axios.post<ResultVO>("/api/teacher/get", user);
    console.log(user);
    console.log(resp);
    commit(vxt.UPDATE_COURSES, resp.data.data);
  },
};
export default createStore({
  state: myState,
  mutations: myMutations,
  actions: myActions,
  modules: {},
});
