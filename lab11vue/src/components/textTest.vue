<template>
    <h1>{{ testmsg }}</h1>
    <div>
    </div>
</template>

<script>
export default {
  name: 'textTest'
  ,
  props: {
    testmsg: String
  }
}
</script>