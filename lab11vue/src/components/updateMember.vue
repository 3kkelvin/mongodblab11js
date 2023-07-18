<template>
  <h2>修改會員資料</h2>
  <br>
  <Input v-model="updateMember.uid" placeholder="會員編號" style="width: 300px"/>
  <br>
  <br>
  <Input v-model="updateMember.name" placeholder="會員姓名" style="width: 300px"/>
  <br>
  <br>
  <Input v-model="updateMember.phone" placeholder="會員電話" style="width: 300px"/>
  <br>
  <br>
  <Button type="primary" @click="submitUpdateMember">送出</Button>
  <br>
  <br>
  <p class="message">{{ updateMemberMessage }}</p>
</template>

<style>
.message {
  font-size: 18px;
  color: #333;
}
</style>

<script>
export default {
  name: 'updateMember',
  data() {
    return {
      updateMember: {
        uid: '',
        name: '',
        phone: ''
      },
      updateMemberMessage: ''
    };
  },
  methods: {
    async submitUpdateMember() {
      const response = await fetch('http://localhost:3001/api/member', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.updateMember)
      });
      const result = await response.json();
      if (response.ok) {
        this.updateMemberMessage = `修改會員${this.updateMember.uid}資料成功`;
      } else {
        this.updateMemberMessage = `修改會員資料失敗: ${result.error}`;
      }
    },
  }
};
</script>