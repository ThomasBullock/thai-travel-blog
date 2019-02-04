<template>
  <div>
    <Alert v-if="alert" :success="alert.type === 'success'" :error="alert.type === 'error'" :message="alert.message"/>
    <div v-else class="spacer"></div>
    <v-flex md10 lg6 offset-md1 offset-lg3>
      <h2>{{formHeading}}</h2>
    </v-flex>
    <form>
      <v-layout>
        <v-flex xs12 md4 lg2 offset-md1 offset-lg3 >
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="date"
              v-validate="'required'"
              label="Date of post"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 md5 lg3 offset-md1>
          <GoogleMapsAutoComplete label="location" @locationChange="location = $event"/>
        </v-flex>
      </v-layout>
      <v-flex xs12 md10 lg6 offset-md1 offset-lg3 >
        <v-text-field
            px-0
            v-model="title"
            name="title"
            label="Title"
            v-validate="'required'"
        ></v-text-field>
      </v-flex>      
      <v-flex xs12 md10 lg6 offset-md1 offset-lg3 >
        <v-textarea
          name="text"
          label="Text"
          v-model="text"
          v-validate="'required'"
        ></v-textarea>
      </v-flex>
      <v-layout v-if="!postData">
        <v-flex xs12 md4 lg2 offset-md1 offset-lg3 >
          <FileUpload v-for="(item, i) in new Array(images.length + 1)" label="Upload a photo" 
            accept="image/gif, image/jpeg, image/png" 
            @upload="uploadFile($event)"
            @error="showAlert('error', $event)"
            :key="'file-'+ i"
          />
        </v-flex> 
        <v-flex xs12 md5 lg3 offset-md1>
          <v-text-field v-for="(item, i) in new Array(images.length + 1)"
              px-0
              :name="'caption-'+i"
              v-validate="(images[i]) ? 'required' : ''"
              v-model="captions[i]"
              label="Caption"
              :key="'caption-'+ i"
          ></v-text-field>
          <v-checkbox v-if="images.length > 1"
            v-model="carousel"
            label="Show images as carousel?"
          ></v-checkbox>
        </v-flex>
      </v-layout>
      <v-flex md10 lg6 offset-md1 offset-lg3>
        <v-btn v-if="!postData" @click="validateBeforeSubmit">submit</v-btn>
        <v-btn v-else @click="validateBeforeSubmit">save</v-btn>
      </v-flex>                
    </form>
    <v-container
      fluid
      grid-list-md
    >
      <v-layout row wrap>
        <v-flex
          v-for="(image, i) in images"
          v-bind="{ [`xs6`]: true }"
          :key="'card-'+ i"
        >
          <v-card>
            <v-img
              :src="resizeCloudinaryImg(image, 400, 600)"
              height="auto"
            >
              <v-container
                fill-height
                fluid
                pa-2
              >
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline white--text" v-text="image"></span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog
      v-model="isLoading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          Uploading photo stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'; 
  import FileUpload from '@/components/FileUpload';
  import Alert from '@/components/Alert';
  import GoogleMapsAutoComplete from '@/components/GoogleMapsAutoComplete';
  import { resizeCloudinaryImg } from '@/helpers'

  export default {
    name: 'NewPost',
    middleware: ['check-auth', 'auth'], //order important!
    components: {
      FileUpload,
      GoogleMapsAutoComplete,
      Alert
    },
    props: {
      formHeading:  {
        type: String,
        required: true,
      },
      postData: {
        type: Object
      }
    },
    data() {
      return {
        title: '',
        location: null,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        alert: null,
        text: '',
        images: [],
        captions: [],
        carousel: false
      }
    },
    computed: {
      ...mapGetters(['isLoading']),
      userId() {
        return this.$store.state.userId;
      }
    },
    methods: {
      showAlert(type, message) {
            this.alert = {
              type,
              message
            };
            setTimeout(() => {
                    this.alert = null;
            }, 3000);
      },
      resizeCloudinaryImg: resizeCloudinaryImg,
      uploadFile(file) {
        console.log(file);
        this.$store.dispatch('uploadPhoto', { title: this.title, file: file })
          .then(res => {
            console.log(res);
            this.showAlert('success', 'Image uploaded successfuly');
            this.images.push(res.url)
          })
          .catch(e => {
            this.showAlert('error', 'Computer says no...');           
            console.log(e)
          })
      },
      submit() {
        const post = {
          userId: this.userId,
          title: this.title,
          location: this.location,
          date: this.date,
          text: this.text,
          images: (this.images.length) ? this.images.map((image, i) => {
            return {
              url: image,
              caption: this.captions[i]
            }
          }) : null,
          carousel: this.carousel
        }
        this.$emit('submit', post)
      },
      validateBeforeSubmit(e) {
        this.$validator.validateAll().then(valid => {
          console.log(`form is ${valid}`)
          if(valid) {
            this.submit();
          } else {
            this.showAlert('error', this.errors.items[0].msg);  
          }
        }).catch(e => {
          console.log(e, 'fail')
        })
      }      
    },
    mounted() {
      if(this.postData) {
        this.title = this.postData.title
        this.text = this.postData.text
        this.date = this.postData.date
        this.carousel = this.postData.carousel
      }
    }
    
  }
</script>

<style scoped lang="scss">

  .spacer {
    background: transparent;
    width: 100%;
    height: 57px;
  }
</style>
