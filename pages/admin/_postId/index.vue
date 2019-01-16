<template>
  <div>
    <h2>Edit post</h2>
  </div>
</template>

<script>
  export default {
    middleware: ['check-auth', 'auth'], //order important!
  }
</script>

<style scoped lang="scss">

</style>