<template>
  <div class="crud select">
    <h1>{{ msg }}</h1>
    <p>
      請直接選擇以下功能
      或是點選github專案連接查看說明
      <a href="https://github.com/3kkelvin/mongodblab11js" target="_blank" rel="noopener">專案連結</a>.
    </p>
    <div id="result">{{ serverStatus }}</div>
    <h3>功能選擇</h3>
    <ul>
      <findOne />
      <findAll />
      <addMember />
      <updateMember />
      <deleteMember />
    </ul>
  </div>
</template>

<script>
import findOne from './findOne.vue'
import findAll from './findAll.vue'
import addMember from './addMember.vue'
import updateMember from './updateMember.vue'
import deleteMember from './deleteMember.vue'
export default {
  name: 'crudForm',
  //調用人的部分
  components: {
    findOne,
    findAll,
    addMember,
    updateMember,
    deleteMember
  },
  //被調用的部分
  props: {
    msg: String
  },
  data() {
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
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}</style>
