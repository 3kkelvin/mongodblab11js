<template>
  <h2>查詢會員</h2>
  <br>
  <p class="message">{{ findAllMessage }}</p>
  <Table border :columns="columns" :data="data"></Table>
</template>

<style>
.message {
  font-size: 18px;
  color: #333;
}
</style>

<script>
export default {
  name: 'findAll',
  data() {
    return {
      findAllMessage: '',
      columns: [
        {
          title: 'UID',
          key: 'uid',
          sortable: true
        },
        {
          title: 'Name',
          key: 'name',
          sortable: true
        },
        {
          title: 'Phone',
          key: 'phone',
          sortable: true
        }
      ],
      data:[]
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
        this.data = result;
      } else {
        this.findAllMessage = `查詢會員失敗:`;
      }
    },
  },
};
</script>