<template>
  <h2>查詢會員</h2>
  <p>{{ findAllMessage }}</p>
  <div id="memberContainer">
    <div v-for="member in members" :key="member.uid">
      <p>UID: {{ member.uid }}, Name: {{ member.name }}, Phone: {{ member.phone }}</p>
      <hr>
    </div>
  </div>
</template>
<script>
export default {
  name: 'findAll',
  data() {
    return {
      member: {
        uid: '',
        name: '',
        phone: ''
      },
      findAllMessage: ''
    };
  },
  mounted() {
    this.findAll();
  },
  methods: {
    async findAll() {
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