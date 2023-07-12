<template>
    <button @click="showAddMemberForm">新增會員</button>
    <div v-if=addMemberForm>
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
</template>

<script>
export default {
name: 'addMember',
data() {
return {
    addMemberForm: false,
    newMember: {
        uid: '',
        name: '',
        phone: ''
    },
    addMemberMessage: ''
};
},
methods: {
    showAddMemberForm() {
      this.addMemberForm = true;
    },
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