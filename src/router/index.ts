import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    props: true,
    path: "/homework/ReserveLab",
    component: () => import("@/views/homework/ReserveLab.vue")
  },
  {
    props: true,
    path: "/homework/teacherCourse",
    component: () => import("@/views/homework/TeacherCourse.vue")
  },
  {
    props: true,
    path: "/homework/courseM",
    component: () => import("@/views/homework/CourseM.vue")
  },
  {
    props: true,
    path: "/homework/LabM",
    component: () => import("@/views/homework/LabManage.vue")
  },
  {
    props: true,
    path: "/homework/teacher",
    component: () => import("@/views/homework/Teacher.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
