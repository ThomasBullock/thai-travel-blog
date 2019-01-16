<template>
  <div>
    <v-text-field  prepend-icon="my_location" single-line
                    v-model="location.formatted_address" 
                    ref="location">
    </v-text-field>
    <!-- <input type="text" :disabled="disabled"
      ref="location" @change="onChange"> -->
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
          location: {
            name: null,
            formatted_address: null,
            coordinates: [null, null]
          }
      }
    },

    methods: { 
      autocomplete(input) {
        var countryRestrict = {'country': 'AU'}
        if(!input) {
          return
        }

        var options = {
          componentRestrictions: countryRestrict,
          // types: ['(cities)']
        };  

        const dropdown = new google.maps.places.Autocomplete(input, options)
        dropdown.addListener('place_changed', () => {
          const place = dropdown.getPlace();
          this.location.name = place.name;
          this.location.formatted_address = place.formatted_address; 
          this.location.coordinates[1] = place.geometry.location.lat(); 
          this.location.coordinates[0] = place.geometry.location.lng();
          console.log(place)
        })        
      }
    },
    mounted() {
      const address = this.$refs.location.$refs.input

      // const address = this.$refs.location 
      this.autocomplete(address);
    },
    watch:{
      'location.formatted_address': {
        immediate: false,
        handler(newValue, oldValue) {
          if(newValue) {
            this.$emit('locationChange', this.location)
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>