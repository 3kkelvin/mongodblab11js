<template>
  <p><!--頁首-->
    Webapi狀態:
    {{ serverStatus }}
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;請直接選擇以下功能
    或是點選github專案連接查看說明
    <a href="https://github.com/3kkelvin/mongodblab11js" target="_blank" rel="noopener">專案連結</a>.
  </p>
  <!--調用主要頁面-->
  <mainPage />
</template>

<script>
import mainPage from './pages/mainPage.vue'
//聲明自己的名字跟用到的組件
export default {
  name: 'App',
  components: {
    mainPage
  },
  data() {//顯示伺服器狀態
    return {
      serverStatus: '',
    };
  },
  mounted() {
    fetch('http://localhost:3001')
      .then(response => response.text())
      .then(data => {
        this.serverStatus = data;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  },
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
