<template>
  <div class="posts-page">
    <v-layout row wrap v-if="loadedPosts.length">
      <v-flex v-for="(post) in loadedPosts" xs12 sm6 md4 lg3 :key="post.id">
        <PostCard  
          :post="post"
          :key="'post-'+post.title" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import PostCard from '@/components/PostCard.vue'

  export default {
    name: 'Posts',
    layout: 'landing',
    components: {
      PostCard
    },    
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts
      }
    },
    mounted() {
      if(!this.$store.state.users) {
        console.log('lets get users');
        // this.$store.dispatch('getUsers')
      }
    }
    
  }
</script>

<style scoped lanfg="scss">
  .posts-page {
    margin-top: 48px;
  }
</style>