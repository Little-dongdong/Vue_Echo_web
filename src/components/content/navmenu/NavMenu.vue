<template>
  <div id="navmenu">
    <el-menu :default-active="activeIndex" class="el-menu-demo"
             mode="horizontal" @select="handleSelect" :router="true">
      <el-menu-item index="0" route="home">
        <img src="~assets/img/易控logo.png" alt="易控logo">
      </el-menu-item>
      <el-menu-item index="1" route="home">首页</el-menu-item>
      <el-menu-item index="2" route="users">易控成员</el-menu-item>
      <el-menu-item index="3" route="1">易控课堂</el-menu-item>
      <el-menu-item index="4" route="profile">个人</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "NavMenu",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu-demo {
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  }

  img{
    width: 60px;
    height: 60px;
  }
</style>
