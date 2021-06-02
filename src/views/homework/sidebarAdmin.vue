<template>
  <div class="main-main">
    <div class="content-p-nav">
      <nav>
        <h2>
          <i class="el-icon-s-custom"></i>
          实验室预约系统
        </h2>
        <ul>
          <li>
            <router-link to="/homework/LabM" class="i">
              <i class="el-icon-user-solid"></i>
              实验室管理
            </router-link>
          </li>
          <li>
            <router-link to="/homework/teacher" class="i">
              <i class="el-icon-circle-plus"></i>
              教师管理
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
    <div id="id"></div>
  </div>
</template>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.main-main {
  display: flex;
}
#id {
  margin-top: 30px;
  width: 1px;
  height: 750px;
  background: darkgray;
}
.content-p-nav {
  display: inline-block;
  width: 300px;
  margin: 50px;
}
.content-p-nav a {
  text-decoration: none;
  color: black;
  display: block;
  padding: 15px 0 15px 20px;
}
.content-p-nav h2 {
  background: #3185bf;
  color: white;
  padding: 10px 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.content-p-nav li {
  list-style: none;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.5s;
}
.content-p-nav li:hover a {
  color: white;
}
.content-p-nav h2 {
  background-color: rgb(0, 33, 71);
}

.content-p-nav h2 {
  border-radius: 0;
}
.content-p-nav li:hover {
  background: grey;
  color: white;
}
</style>
