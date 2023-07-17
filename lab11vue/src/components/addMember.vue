
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
      this.addMemberForm = ~this.addMemberForm;
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