<template>
  <h2>刪除會員</h2>
  <br>
  <br>
  <Input v-model="deleteUid" placeholder="會員編號" style="width: 300px"/>
  <Button type="primary" @click="deleteMember">送出</Button>
  <br>
  <br>
  <p class="message">{{ deleteMemberMessage }}</p>
</template>

<style>
.message {
  font-size: 18px;
  color: #333;
}
</style>

<script>
export default {
  name: 'deleteMember',
  data() {
    return {
      deleteUid: '',
      deleteMemberMessage: ''
    };
  },
  methods: {
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