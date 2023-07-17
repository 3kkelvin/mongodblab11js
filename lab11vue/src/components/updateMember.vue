
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