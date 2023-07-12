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
    
    <textTest testmsg="componenttest"/>
    <ul>
      <button @click="showAddMemberForm">新增會員</button>
      <button @click="findAll">查詢所有會員</button>
      <findOne />
      <!--button @click="showFindOneForm">查詢單一會員</button-->
      <button @click="showUpdateMemberForm">修改會員資料</button>
      <button @click="showDeleteMemberForm">刪除會員資料</button>
    </ul>
    <div v-if="showAddMemberForm">
      <h2>新增會員</h2>
      <input type="text" v-model="newMember.uid" placeholder="會員編號">
      <br>
      <input type="text" v-model="newMember.name" placeholder="會員姓名">
      <br>
      <input type="text" v-model="newMember.phone" placeholder="會員電話">
      <br>
      <button @click="submitAddMember">送出</button>
      <br>
      <p>{{ addMemberMessage }}</p>
    </div>

    <div v-if="showAllMembers">
      <h2>查詢會員</h2>
      <p>{{ findAllMessage }}</p>
      <div id="memberContainer">
        <div v-for="member in members" :key="member.uid">
          <p>UID: {{ member.uid }}, Name: {{ member.name }}, Phone: {{ member.phone }}</p>
          <hr>
        </div>
      </div>
    </div>

    <div v-if=findOneForm>
      <h2>查詢單一會員</h2>
      <input type="text" v-model="uidValue" placeholder="會員編號">>
      <br>
      <button @click="findOne">送出</button>
      <br>
      <p>{{ findOneMessage }}</p>
    </div>

    <div v-if="showUpdateMemberForm">
      <h2>修改會員資料</h2>
      <input type="text" v-model="updateMember.uid" placeholder="會員編號">
      <br>
      <input type="text" v-model="updateMember.name" placeholder="會員姓名">
      <br>
      <input type="text" v-model="updateMember.phone" placeholder="會員電話">
      <br>
      <button @click="submitUpdateMember">送出</button>
      <br>
      <p>{{ updateMemberMessage }}</p>
    </div>

    <div v-if="showDeleteMemberForm">
      <h2>刪除會員</h2>
      <input type="text" v-model="deleteUid" placeholder="會員編號">
      <br>
      <button @click="deleteMember">送出</button>
      <br>
      <p>{{ deleteMemberMessage }}</p>
    </div>
  </div>
</template>

<script>
import findOne from './findOne.vue'
import textTest from './textTest.vue'
export default {
  name: 'crudForm',
  //調用人的部分
  components: {
    findOne,
    textTest
  },
  //被調用的部分
  props: {
    msg: String
  },
  data() {
    return {
      serverStatus: '',
      findOneForm: false,
      uidValue: '',
      findOneMessage: ''
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
    showFindOneForm() {
      this.findOneForm = true;
    },
    async findOne() {
      const response = await fetch(`http://localhost:3001/api/member/${this.uidValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const result = await response.json();
      if (response.ok) {
        this.findOneMessage = `會員${this.uidValue}:姓名:${result.name},電話:${result.phone}`;
      } else {
        this.findOneMessage = `查詢失敗:${result.error}`;
      }
    }
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
}
</style>
