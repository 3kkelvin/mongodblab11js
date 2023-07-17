<template>
  <p>
    請直接選擇以下功能
    或是點選github專案連接查看說明
    <a href="https://github.com/3kkelvin/mongodblab11js" target="_blank" rel="noopener">專案連結</a>.
  </p>
  <!--調用這個組件-->
  <mainPage />
  <!--crudForm msg="前端網頁實作vue"/-->
</template>

<script>
//import crudForm from './components/crudForm.vue'
import mainPage from './pages/mainPage.vue'
//聲明自己的名字跟用到的組件
export default {
  name: 'App',
  components: {
    //crudForm,
    mainPage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
