### 项目名称：实验室预约系统
#### 项目简介：
系统分为两个角色  <br />
实验室管理员 <br />
实验室管理，添加实验室，实验室编号，机器数量，描述(机器配置等) <br />
教师管理，教师信息的CURD <br />
教师 <br />
课程实验管理，添加课程名称，学生数量，学时数 <br />
实验室预约 <br />
#### 项目说明：
前端：主要基于TypeScript与vue 3.0.5框架实现，使用element-plus框架提供友好美化的互交操作。使用vuex管理全局数据状态，引入axios-mock-adapter模拟后端数据，通过axios拦截器实现请求全局异常处理。token保存在SessionStorage防止页面刷新登录数据丢失，基于后端返回的角色权限动态生成路由信息。
