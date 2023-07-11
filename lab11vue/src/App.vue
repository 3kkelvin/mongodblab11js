<template>
  <!--調用這個組件-->
  <crudForm msg="前端網頁實作vue"/>
</template>

<script>
import crudForm from './components/crudForm.vue'
//聲明自己的名字跟用到的組件
export default {
  name: 'App',
  components: {
    crudForm
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
  margin-top: 60px;
}
</style>
