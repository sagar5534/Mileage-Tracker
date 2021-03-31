<template>
  <v-banner single-line sticky color="primary" dark>
    <div class="d-flex align-center">
      <v-btn @click="goHome" target="_blank" text>
        <div class="d-flex align-center">
          <div class="transition-swing text-h5" v-text="appTitle"></div>
        </div>
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn target="_blank" href="https://us-central1-mileage-tracker-e8c8d.cloudfunctions.net/firestoreFunc" text>
        <span class="material-icons">
          cloud_download
        </span>
      </v-btn>
    </div>
  </v-banner>
</template>
<script>
export default {
  data: () => ({
	appTitle: "Mileage Tracker",
  }),
  methods: {
    goHome() {
      this.$router.push("/");
    },
  },
};
</script>
