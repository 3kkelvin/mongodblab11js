
<script>
export default {
name: 'findAll',
data() {
return {
    allMembers: false,
    member: {
        uid: '',
        name: '',
        phone: ''
    },
    findAllMessage: ''
};
},
methods: {
    async findAll() {
        this.allMembers = ~this.allMembers;    
        const response = await fetch('http://localhost:3001/api/member', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const result = await response.json();
      if (response.ok) {
        this.findAllMessage = `現有會員:`;
        this.members = result;
      } else {
        this.findAllMessage = `查詢會員失敗:`;
      }
    },
    },
};
</script>