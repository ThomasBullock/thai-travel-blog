<template>
  <v-flex
      xs12
      sm12
      md10
      lg10
      offset-md1
      offset-lg1
    >
      <v-card>
        <v-container
          grid-list-sm
          fluid
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-for="(photo, i) in images"
              :key="'photo-'+i"
              xs4
              d-flex
            >
              <v-card
                flat
                tile
                class="d-flex"
              >
                <v-img
                  :src="photo.url"
                  :lazy-src="`https://picsum.photos/10/6?image=${i * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <v-layout
                    slot="placeholder"
                    fill-height
                    align-center
                    justify-center
                    ma-0
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-layout>
                </v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
</template>

<script>
  export default {
    name: 'PhotoGrid',
    props: {
      images: {
        type: Array
      }
    }
  }
</script>

<style scoped>

</style>