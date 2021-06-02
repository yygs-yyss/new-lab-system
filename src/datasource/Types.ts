export interface Lab {
  id: string;
  number: number;
  detail: string;
}
export interface ClassroomMessage {
  id?: string;
  lesson?: string;
  courseName?: string;
  start?: number;
  end?: number;
  teacherName?: string;
  title?: string;
}
export interface CourseMessage {
  id?: string;
  teacherId?: string;
  courseName: string;
  start: number;
  end: number;
  teacherName: string;
  period: number;
  studentNumber: number;
}
export interface SelectMessage {
  id?: string;
  start?: number;
  end?: number;
  lesson?: string;
}
export interface User {
  role: number;
  userName?: string;
  password?: string;
}
export interface UserLogin {
  id?: string;
  name?: string;
  userName?: string;
  password?: string;
  role?: number;
}
export interface Teacher {
  id?: string;
  name?: string;
  title?: string;
  graduationSchool?: string;
  userName?: string;
  password?: string;
  detail?: string;
}
