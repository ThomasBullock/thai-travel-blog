<template>
  <nuxt-link :to="href" >
    <div class="elevation-2 post-card"
    >
      <v-img class="post-card__stamp" aspect-ratio="1.5456" :src="stamp[Math.floor(Math.random() * 4)]"></v-img>
      <v-img :src="(post.images) ? post.images[0].url : 'https://file.veltra.com/jp/promotion/ctg_img/21504.jpg'" :alt="(post.images) ? post.images[0].caption : post.title "></v-img>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
    name: 'PostCard',
    props: {
      post: {
        type: Object,
        required: true
      },
      href: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        stamp: [
          {src: require('@/assets/img/stamp1.png')},
          {src: require('@/assets/img/stamp2.png')},
          {src: require('@/assets/img/stamp3.png')},
          {src: require('@/assets/img/stamp4.png')},          

        ],
        postMark: {
          src: require('@/assets/img/postmark.png')
        },
      }
    },

    
  }
</script>

<style scoped lang="scss">
  @import '@/assets/style/scss/app.scss';

  .post-card {
    @include parallelogram(10deg);
    position: relative;
    background: $aqua;
    padding: 24px;
    width: 100%;
    height: auto;
    transition: transform 250ms ease-in;
    // margin-bottom: 24px;

    &:hover {
      @include parallelogram(0deg);
      transform: scale(1.1);
      z-index: 2000;
    }

  .post-card__stamp {
    background: transparentize($ebony, .9);
    width: 25%;
    height: auto;

    z-index: 200;
    position: absolute;
    right: 12px;
    top: 12px;
  }

  }
</style>