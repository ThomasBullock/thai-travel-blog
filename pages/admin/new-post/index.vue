<template>
  <div>
    <BlogPostForm 
      formHeading="Create a new post"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
  import BlogPostForm from '@/components/BlogPostForm';

  export default {
    middleware: ['check-auth', 'auth'], //order important!
    components: {
      BlogPostForm
    },
    methods: {
      handleSubmit(postData) {
        console.log(postData)
        this.$store.dispatch('createPost', postData)
        .then(res => {
          this.$router.push('/posts')
        })
        .catch(e => console.log('newpost catch', e))
      }
    }
  }
</script>

<style scoped>

</style>