<template>
    <h2>查詢單一會員</h2>
    <input type="text" v-model="uidValue" placeholder="會員編號">>
    <br>
    <Button type="primary" @click="findOne">送出</Button>
    <br>
    <p>{{ findOneMessage }}</p>
</template>

<script>
export default {
  name: 'findOne',
  data() {
    return {
      uidValue: '',
      findOneMessage: ''
    };
  },
  methods: {
    async findOne() {
      const response = await fetch(`http://localhost:3001/api/member/${this.uidValue}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const result = await response.json();
      if (response.ok) {
        this.findOneMessage = `會員${this.uidValue}:姓名:${result.name},電話:${result.phone}`;
      } else {
        this.findOneMessage = `查詢失敗:${result.error}`;
      }
    }
  }
};
</script>