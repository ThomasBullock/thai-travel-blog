<template>
  <div>
    <h2>Edit post</h2>
    <h4>{{postData.title}}</h4>
    <p>{{postData.text}}</p>
    <!-- <BlogPostForm
      :postData="postData"
      formHeading="Create a new post"
      @submit="handleSubmit"
    /> -->
    <v-btn color="warning" @click="deletePost">Delete</v-btn>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'EditPost',
    middleware: ['check-auth', 'auth'], //order important!
    methods: {
      handleSubmit(postData) {
        console.log(postData)
        this.$store.dispatch('createPost', postData)
        .then(res => {
          this.$router.push('/posts')
        })
        .catch(e => console.log('newpost catch', e))
      },      
      deletePost() {
        this.$store.dispatch('deletePost', this.$route.params.postId)
          .then(this.$router.push('/admin'))
      }
    },
    computed: {
      ...mapGetters([
        'loadedPosts'
      ]),      
      postData() {
        return this.loadedPosts.filter(post => post.id == this.$route.params.postId)[0];
      }
    }

  }
</script>

<style scoped lang="scss">

</style>