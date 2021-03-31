<template>
  <v-app>
    <AppHeader />
    <v-container>
      <v-card class="mx-auto" max-width="550" tile elevation="0">
        <div class="d-flex align-center">
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ name }}
              </v-list-item-title>
              <v-list-item-subtitle>Previous Records</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            elevation="2"
            class="mr-3"
            icon
            @click.stop="flipModal(true)"
          >
            <span class="material-icons">add</span>
          </v-btn>
        </div>

        <v-list-item>
          <span class="material-icons">send</span>
          <v-list-item-subtitle class="ml-3 mt-1">Total Driven</v-list-item-subtitle>
        </v-list-item>

        <v-divider></v-divider>

        <v-card class="ma-3" v-for="item in store.MileageCollection" :key="item.id">
          <v-card-text class="pb-0">
            <div class="d-flex align-center">
              <div class="text-h4">{{ dateString(item.data().date) }}</div>
              <v-spacer></v-spacer>
              <div class="text-h5">{{ currencyString(item.data().earned + item.data().additionalEarned) }}</div>
            </div>
            <div class="d-flex align-center">
              <div class="text-subtitle-1">{{ distanceString(item.data()) }}</div>
              <v-spacer></v-spacer>
              <div class="text-subtitle-1">{{ distanceTravelled(item.data()) }}</div>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-btn 
              text 
              color="deep-purple accent-4"
              @click.stop="flipModal(item, true)"
            > Edit </v-btn>
          </v-card-actions>
        </v-card>

        <v-divider></v-divider>
        
      </v-card>
    </v-container>

    <MileageModal v-if="dialog" :dialog.sync="dialog" :type="name" :item="tempItem" :isEditing="tempIsEditing"/>
  </v-app>
</template>

<script>
import AppHeader from "./AppHeader.vue";
import MileageModal from "./MileageModal.vue";
import { store } from '../store';

export default {
  name: "Mileagedetail",
  data: () => ({
    name: "",
    dialog: false,
    store,
    sendId: "",
    tempItem: {},
    tempIsEditing: false,
  }),
  components: {
    AppHeader,
    MileageModal,
  },
  methods: {
    flipModal(item = {}, editing) {
      this.dialog = !this.dialog;
      this.tempItem = item
      this.tempIsEditing = editing
    },
    seeMore() {
      store.getDocuments(this.$route.params.filter)
    },
    distanceString(item) {
      var {startMileage, endMileage} = item
      var st = "", en = ""

      if (startMileage != 0)
        st = `${startMileage.toLocaleString()} Km`
        
      if (endMileage != 0)
        en = ` - ${endMileage.toLocaleString()} Km`

      return `${st} ${en}`
    },
    distanceTravelled(item) {
      var {startMileage, endMileage} = item
      if (startMileage != "" && endMileage != "")
        return `${(endMileage - startMileage).toLocaleString()} Km Travelled `
    },
    dateString(date) {
      return date.toDate().toLocaleDateString()
    },
    currencyString(currency) {
      return currency.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })
    },
  },
  created: function() {
    store.getDocuments(this.$route.params.filter)
    this.name = this.$route.params.filter
  },
  beforeDestroy: function() {
    store.destoy()
  }
};
</script>
