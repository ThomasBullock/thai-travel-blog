<template>
  <nuxt-link :to="href" >
    <div class="elevation-2 post-card"
      :class="(Math.random() > .5) ? 'post-card--peach' : 'post-card--aqua'"
    >
      <v-img class="post-card__stamp" aspect-ratio="1.5456" :src="stamp[Math.floor(Math.random() * 4)]"></v-img>
      <v-img :src="(post.images) ? resizeCloudinaryImg(cover.url, 400, 600) : 'https://file.veltra.com/jp/promotion/ctg_img/21504.jpg'" :alt="(post.images) ? post.images[0].caption : post.title "></v-img>
      <img class="post-card__postmark" 
        :src="postMark.src" 
        alt="thai postmark"
        :style="{ 
          transform: (Math.random() > .5) ? 'rotate(' + Math.floor(Math.random() * 25) + 'deg' : 'rotate(-' + Math.floor(Math.random() * 25) + 'deg', 
          top: Math.floor(Math.random() * 20) + 5 + 'px',
          right: Math.floor(Math.random() * 45) + 20 + 'px'
          }"
      >
    </div>
  </nuxt-link>
</template>

<script>
  import { resizeCloudinaryImg } from '@/helpers'

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
        cover: null
      }
    },
    methods: {
      resizeCloudinaryImg: resizeCloudinaryImg,
    },
    created() {
      this.cover = this.post.images[this.post.images.findIndex((image) => image.cover)];
      if(!this.cover) {
        this.cover = this.post.images[0]
      }
      // return cover
    }

    
  }
</script>

<style scoped lang="scss">
  @import '@/assets/style/scss/app.scss';

  .post-card__postmark {
    position: absolute;
    // top: 0;
    // right: 25px;
    z-index: 3000;
  }

  .post-card {
    @include parallelogram(10deg);
    position: relative;
    background: $aqua;
    padding: 24px;
    width: 100%;
    height: auto;
    transition: transform 250ms ease-in;
    // margin-bottom: 24px;

    &--peach {
      background: $peach;
    }

    &--aqua {
      background: $aqua;
    }    

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