<template>
  <div class="posts-page"
    :class="{'posts-page--xs' : $vuetify.breakpoint.name == 'xs'}"
  >
    <v-layout row wrap v-if="loadedPosts.length" class="post-list">
      <v-flex class="postcard-wrapper" v-for="(post) in loadedPosts" xs12 sm6 md4 lg3 :key="post.id">
        <PostCard
          :href="'/posts/'+post.id"  
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
    head: {
      title: 'Posts Page 🚀',      
      meta: [
        { hid: 'description', name: 'description', content: 'Chom Siam Thai Travel Blog - Posts Page' },    
      ],
    },
    layout: 'landing',
    components: {
      PostCard
    },    
    computed: {
      loadedPosts() {
        return this.$store.getters.loadedPosts.sort((a, b) => new Date(a.date) - new Date(b.date))
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

<style scoped lang="scss">
  .posts-page {
    margin-top: 96px;

    &--xs {
      margin-top: 144px;
    }
  }

  .postcard-wrapper {

    /* margin-left: 1.5%;
    margin-right: 1.5%;  */
  }

  .post-list {
    margin-top: 96px;

  }
</style>