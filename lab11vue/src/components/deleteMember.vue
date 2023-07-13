<template>
    <Button type="primary" @click="showDeleteMemberForm">刪除會員資料</Button>
    <div v-if="deleteMemberForm">
        <h2>刪除會員</h2>
        <input type="text" v-model="deleteUid" placeholder="會員編號">
        <br>
        <Button type="primary" @click="deleteMember">送出</Button>
        <br>
        <p>{{ deleteMemberMessage }}</p>
    </div>

</template>

<script>
export default {
name: 'deleteMember',
data() {
return {
  deleteMemberForm: false,
  deleteUid: '',
  deleteMemberMessage: ''
};
},
methods: {
  showDeleteMemberForm() {
    this.deleteMemberForm = ~this.deleteMemberForm;
  },
async deleteMember() {
  const response = await fetch(`http://localhost:3001/api/member/${this.deleteUid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  const result = await response.json();
  if (response.ok) {
    this.deleteMemberMessage = `會員${this.deleteUid}已成功刪除`;
  } else {
    this.deleteMemberMessage = `刪除失敗:${result.error}`;
  }
}
}
};
</script>