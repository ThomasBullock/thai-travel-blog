<template>
  <div>
    <h2>Welcome to admin - you are logged in</h2>
    <v-btn color="success"><nuxt-link to="/admin/new-post">New post</nuxt-link></v-btn>
    <v-btn color="primary" @click="handleLogout">Log out</v-btn>
    <v-layout row wrap v-if="loadedPosts.length" class="post-list">
      <v-flex v-for="(post) in usersPosts" xs12 sm6 md4 lg3 :key="post.id">
        <PostCard
          :href="'/admin/'+post.id"    
          :post="post"
          :key="'post-'+post.title" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import PostCard from '@/components/PostCard.vue';

  export default {
    name: 'Admin',
    middleware: [
      'check-auth',
      'auth'
    ],
    components: {
      PostCard
    },
    methods: {
      ...mapActions(['logout']),
      handleLogout() {
        this.logout()
        this.$router.push('/admin/auth')
      }
    },
    computed: {
      ...mapGetters([
        'loadedPosts'
      ]),
      userId() {
        return this.$store.state.userId;
      },
      usersPosts() {
        return this.loadedPosts.filter(post => post.userId == this.userId)
      }
    },
    mounted() {
      console.log('admin', this.userId);
    },
    updated() {
      console.log('admin', this.userId);
    }
  }
</script>

<style scoped lang="scss">

  .post-list {
    margin-top: 24px;

  }

</style>