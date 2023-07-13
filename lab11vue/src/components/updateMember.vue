<template>
    <Button type="primary" @click="showUpdateMemberForm">修改會員資料</Button>
    <div v-if=updateMemberForm>
      <h2>修改會員資料</h2>
      <input type="text" v-model="updateMember.uid" placeholder="會員編號">
      <br>
      <input type="text" v-model="updateMember.name" placeholder="會員姓名">
      <br>
      <input type="text" v-model="updateMember.phone" placeholder="會員電話">
      <br>
      <Button type="primary" @click="submitUpdateMember">送出</Button>
      <br>
      <p>{{ updateMemberMessage }}</p>
    </div>
</template>

<script>
export default {
name: 'updateMember',
data() {
return {
    updateMemberForm: false,
    updateMember: {
        uid: '',
        name: '',
        phone: ''
    },
    updateMemberMessage: ''
};
},
methods: {
    showUpdateMemberForm() {
      this.updateMemberForm = ~this.updateMemberForm;
    },
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
        this.aupdateMemberMessage = `修改會員資料失敗: ${result.error}`;
      }
    },
}
};
</script>