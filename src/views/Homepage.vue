<template>
  <v-app style="background-color:white" >
    <AppHeader/>

    <v-container >
      <v-card 
      v-for="item in store.MileageTypes" :key="item.day"
      class="mx-auto ma-5" 
      shaped 
      max-width="550">
        <v-card-text class="pb-0">
          <div class="text-h4">{{ item }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn text color="deep-purple accent-4" @click="goTo(item)" >
            Check Out
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import AppHeader from './AppHeader.vue';
import { store } from '../store';


export default {
  name: "Homepage",
  data: () => ({
    MileageTypes: [],
    store
  }), 
  components: {
    AppHeader
  },
  methods: {
    goTo (id) {
      this.$router.push({ name: 'Detail', params: { filter: id } })  
    }
  }
};
</script>
