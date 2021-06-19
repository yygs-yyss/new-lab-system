import { User } from "@/datasource/Types";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(axios);
// 过滤http前缀请求
mock.onAny(/^http/).passThrough();
mock.onAny(/^\/api\//).passThrough();

//
// 地址，支持JS正则表达式
// 正则表达式中 \，由转义符，\/，替代
// 匹配任意字符，\w+；
// $，结束。避免匹配多个
// 整个表达式，置于/  /之间
// 通用的，将{}占位符的字符串路径，转为正则表达式对象
// 例如，/users/{uid}; /users/{uid}/courses/{hid}
function path(p: string) {
  const reg = p.replace(/{\w+}/g, "(\\w+)").replace(/\//g, "\\/") + "$";
  return new RegExp(reg);
}
// ===================================

export interface ResultVO {
  code: number;
  message?: string;
  data?: any;
}
const resulVO: ResultVO = {
  code: 200,
  data: {},
};

// //reply的参数列表 (status, data, headers)
// //status，http状态码  data是返回的json数据
// mock.onGet("users/12").reply(200, {
//   code: 200,
//   data: { user: { id: 1, name: "BO" } as User },
// } as ResultVO);

// // 等价于 users/任意值
// mock.onGet(path("users/{uid}")).reply(200, {
//   code: 200,
//   data: { user: { id: 2, name: "SUN" } as User },
// } as ResultVO);

// // users/4/coursess/21
// mock.onGet(path("users/{uid}/courses")).reply(200, {
//   code: 200,
//   data: { courses: },
// } as ResultVO);

// // config，axios config对象。包含请求信息
// // 返回数组，[status, {data对象}, {header对象}]
// mock.onPost("login").reply((c) => {
//   // 获取请求数据
//   // 此时请求的js对象已转为json字符串。因此需要转换回JS对象
//   const data = c.data;
//   const { number, password } = JSON.parse(data);
//   if (number == "1001" && password == "123456") {
//     resulVO.code = 200;
//     resulVO.data = { role: "243f45a3ce", user: { title: "讲师" } };
//     resulVO.message = "";
//     return [
//       200,
//       resulVO,
//       {
//         token:
//           "744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6",
//       },
//     ];
//   }
//   resulVO.code = 401;
//   resulVO.message = "用户名密码错误";
//   return [200, resulVO];
// });

// // 模拟请求携带token是否合法
// mock.onGet("home").reply((c) => {
//   const auth = c.headers?.authorization;
//   if (
//     auth ==
//     "744193c872b677aab12a0ced447882f4cf9fca92a09d428a26ed145ed2ed2eec665c8824ebc353042ba2be136efcb5c6"
//   ) {
//     resulVO.code = 200;
//     resulVO.data = { courses: listCourses() };
//     return [200, resulVO];
//   }
//   resulVO.code = 403;
//   resulVO.message = "无权限";
//   return [200, resulVO];
// });

// // mock.onGet(path("courses/{cid}")).reply(c => {
// //   // 默认不支持从正则表达式提取变量，可手动实现
// //   const reg = /courses\/(\d+)/;
// //   const cid = c.url?.match(reg)![1];
// //   const course = listCourses().find(h => h.id == cid);
// //   resulVO.code = 200;
// //   resulVO.data = { course: course };
// //   return [200, resulVO];
// // });
