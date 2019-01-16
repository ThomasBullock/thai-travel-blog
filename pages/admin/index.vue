<template>
  <div>
    <h2>Welcome to admin - you are logged in</h2>
    <v-btn color="success"><nuxt-link to="/admin/new-post">New post</nuxt-link></v-btn>
    <v-btn color="primary" @click="handleLogout">Log out</v-btn>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    middleware: [
      'check-auth',
      'auth'
    ],
    methods: {
      ...mapActions(['logout']),
      handleLogout() {
        this.logout()
        this.$router.push('/admin/auth')
      }
    }
  }
</script>

<style scoped lang="scss">

</style>