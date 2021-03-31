<template>
  <v-app>
    <v-dialog v-model="dialogVar" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Record</span>
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
                  v-model="startMileage"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="End Mileage"
                  suffix="Km"
                  required
                  v-model="endMileage"
                ></v-text-field>
              </v-col>

              <v-divider></v-divider>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Earned"
                  prefix="$"
                  required
                  v-model="earned"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="Extra (lyft)"
                  prefix="$"
                  v-model="extra"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea label="Notes" v-model="notes"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="dialogVar = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click.stop="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { store } from '../store';
export default {
  props: ["dialog", "type"],
  name: "Mileagemodal",
  data: () => ({
    id: "",
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    startMileage: 0,
    endMileage: 0,
    earned: 0,
    extra: 0,
    notes: ""
  }),
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
    save() {
      var payload = {}
      payload.date = new Date(this.date),
      payload.startMileage = Number(this.startMileage),
      payload.endMileage = Number(this.endMileage),
      payload.earned = Number(this.earned),
      payload.additionalEarned = Number(this.extra),
      payload.memo = this.notes
      payload.type = this.type
      
      if (store.saveRecord(payload))
        this.dialogVar = false
        
    },
  },
};
</script>
