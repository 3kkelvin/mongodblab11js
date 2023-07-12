<template>
        <button @click="showFindOneForm">查詢單一會員</button>
        <div v-if=findOneForm>
            <h2>查詢單一會員</h2>
            <input type="text" v-model="uidValue" placeholder="會員編號">>
            <br>
            <button @click="findOne">送出</button>
            <br>
            <p>{{ findOneMessage }}</p>
    </div>
    
  </template>
  
  <script>
  export default {
    name: 'findOne',
    data() {
    return {
      findOneForm: false,
      uidValue: '',
      findOneMessage: ''
    };
  },
    methods: {
    showFindOneForm() {
      this.findOneForm = ~this.findOneForm;
    },
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