<template>
  <h2>新增會員</h2>
  <input type="text" v-model="newMember.uid" placeholder="會員編號">
  <br>
  <input type="text" v-model="newMember.name" placeholder="會員姓名">
  <br>
  <input type="text" v-model="newMember.phone" placeholder="會員電話">
  <br>
  <Button type="primary" @click="submitAddMember">送出</Button>
  <br>
  <p>{{ addMemberMessage }}</p>
</template>
<script>
export default {
  name: 'addMember',
  data() {
    return {
      newMember: {
        uid: '',
        name: '',
        phone: ''
      },
      addMemberMessage: ''
    };
  },
  methods: {
    async submitAddMember() {
      const response = await fetch('http://localhost:3001/api/member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.newMember)
      });
      const result = await response.json();
      if (response.ok) {
        this.addMemberMessage = `新增會員成功: ${result.insertedId}`;
      } else {
        this.addMemberMessage = `新增會員失敗: ${result.error}`;
      }
    },
  }
};
</script>