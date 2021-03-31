<template>
  <v-app>
    <v-dialog v-model="dialogVar" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Record</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Start Mileage"
                  suffix="Km"
                  required
                  v-model="itemData.startMileage"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="End Mileage"
                  suffix="Km"
                  required
                  v-model="itemData.endMileage"
                ></v-text-field>
              </v-col>

              <v-divider></v-divider>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Earned"
                  prefix="$"
                  required
                  v-model="itemData.earned"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Extra (lyft)"
                  prefix="$"
                  v-model="itemData.additionalEarned"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea label="Notes" v-model="itemData.memo"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click.stop="showConfirm">
            Delete
          </v-btn>
          <v-btn color="blue darken-1" text @click.stop="close">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click.stop="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <DeleteConfirm v-if="showConfirmDialog" :dialog.sync="showConfirmDialog" :deleteFunc="deleteItem"/>

  </v-app>
  

</template>

<script>
import { store } from '../store';
import DeleteConfirm from "./DeleteConfirm.vue";
export default {
  props: ["dialog", "type", "item", "isEditing"],
  name: "Mileagemodal",
  data: () => ({
    itemData: {},
    menu: false,
    date: new Date().toISOString().substr(0, 10),
    showConfirmDialog: false,
  }),
  components: {
    DeleteConfirm,
  },
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
  created() {
    console.log("Creating")
    if (this.isEditing){
      this.itemData = Object.assign({}, this.item.data())
      this.date = this.itemData.date.toDate().toISOString()
    }
    else {
      this.itemData = {
        date: new Date().toISOString().substr(0, 10),
        startMileage: 0,
        endMileage: 0,
        earned: 0,
        additionalEarned: 0,
        memo: ""
      }
    }
  },
  methods: {
    save() {
      console.log(this.itemData)

      var payload = {}
      payload.date = new Date(this.date),
      payload.startMileage = Number(this.itemData.startMileage),
      payload.endMileage = Number(this.itemData.endMileage),
      payload.earned = Number(this.itemData.earned),
      payload.additionalEarned = Number(this.itemData.additionalEarned),
      payload.memo = this.itemData.memo
      payload.type = this.type

      if (this.isEditing) {
        if (store.updateRecord(this.item, payload))
          this.dialogVar = false
      }else{
        if (store.saveRecord(payload))
          this.dialogVar = false
      }
  
    },
    deleteItem () {
      if (store.deleteRecord(this.item))
          this.dialogVar = false
    },
    close() {
      this.dialogVar = false
    },
    showConfirm() {
      this.showConfirmDialog = true
    }
  }
};
</script>
