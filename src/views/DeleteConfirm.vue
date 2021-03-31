<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialogVar"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          Are you sure?
        </v-card-title>
        <v-card-text>Once deleted, this session will be forever lost!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="close(false)"
          >
            Cancel
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="close(true)"
          >
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
export default {
  props: ["dialog", "deleteFunc"],
  name: "DeleteConfirm",
  computed: {
    dialogVar: {
      get: function() {
        return this.dialog;
      },
      set: function(newValue) {
        this.$emit("update:dialog", newValue);
      },
    },
  },
  methods: {
    close(willDelete) {
        
        if (willDelete)
            this.delete()

        this.dialogVar = false
    },
    delete() {
        this.deleteFunc()
    }
  }
};
</script>
