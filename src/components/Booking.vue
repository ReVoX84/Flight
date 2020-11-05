<template>
  <v-form
    ref="booking"
    v-model="valid"
    v-if="!submitted"
    lazy-validation
  >
    <v-container fluid>
      <v-row>
        <v-col></v-col>
        <v-col
          class="d-flex"
          cols="5"
        >
          <v-select
            v-model="departureSelected"
            :prepend-icon="BookingIcons.departure"
            :items="departure"
            label="Van"
          ></v-select>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col
          class="d-flex"
          cols="5"
        >
          <v-select
            v-model="destinationSelected"
            :prepend-icon="BookingIcons.destination"
            :items="destinations"
            label="Naar"
          ></v-select>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col
          cols="5"
        >
          <v-menu
            ref="menuFrom"
            v-model="menuFrom"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateFrom"
                label="Heenreis"
                :prepend-icon="BookingIcons.from"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateFrom"
              :min="dateFromMin"
              no-title
              scrollable
            >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col
          cols="5"
        >
          <v-menu
            ref="menuTill"
            v-model="menuTill"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateTill"
                label="Terugreis"
                :prepend-icon="BookingIcons.till"
                v-bind="attrs"
                v-on="on"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dateTill"
              :min="dateTillMin"
              no-title
              scrollable
            >
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col cols="5">
          <v-text-field
            v-model="passengers"
            :prepend-icon="BookingIcons.passengers"
            label="Passagiers"
            type="number"
            :rules="passengersRules"
          ></v-text-field>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row>
          <v-col></v-col>
          <v-col
            cols="5"
          >
            <v-btn block
              @click="validate"
            >
              Bekijk overzicht
            </v-btn>
          </v-col>
          <v-col></v-col>
        </v-row>
    </v-container>
  </v-form>
</template>

<script>
import store from '@/store'
import BookingIcons from '@/bookingIcons'

export default {
  data: () => ({
    BookingIcons: BookingIcons,
    submitted: false,
    valid: true,
    passengersRules: [
        v => !!v || 'Het aantal passagiers is verplicht',
        v => Number(v) > 0 || 'Het minimum aantal passagiers is 1',
        v => Number(v) <= 10 || 'Het maximum aantal passagiers is 10',
    ],
    departure: ['Amsterdam - Schiphol (AMS)', 'Eindhoven - Eindhoven Airport (EIN)'],
    departureSelected: 'Amsterdam - Schiphol (AMS)',
    destinations: ['Afghanistan', 'Albanië', 'Algerije', 'Amerikaanse Maagdeneilanden', 'Angola', 'Antigua en Barbuda', 'Argentina', 'Armenië', 'Aruba', 'Australië', 'Azerbeidzjan'],
    destinationSelected: 'Afghanistan',
    dateFromMin: new Date().toISOString().substr(0, 10),
    dateFrom: new Date().toISOString().substr(0, 10),
    menuFrom: false,
    dateTill: '',
    dateTillMin: '',
    menuTill: false,
    passengers: 2,
  }),
  mounted () {
    this.setDateTill(new Date())
    this.setDateTillMin(new Date())
  },
  watch: {
    dateFrom (date) {
      this.$refs.menuFrom.save(date)

      this.setDateTill(date)
      this.setDateTillMin(new Date(Date.parse(date)))

      this.menuFrom = false
    },
    dateTill (date) {
      this.$refs.menuTill.save(date)

      this.menuTill = false
    },
  },
  methods: {
    setDateTill (date) {
      const dateTill = new Date(Date.parse(date))

      dateTill.setDate(dateTill.getDate() + 7)

      this.dateTill = dateTill.toISOString().substr(0, 10)
    },
    setDateTillMin (date) {
      const dateTillMin = new Date(date.setDate(date.getDate() + 1))
      this.dateTillMin = dateTillMin.toISOString().substr(0, 10)
    },
    validate () {
      this.submitted = this.$refs.booking.validate()

      if (this.valid && this.submitted) {
        store.dispatch('booking/setBooking', {
          departure: this.departureSelected,
          destination: this.destinationSelected,
          from: this.dateFrom,
          till: this.dateTill,
          passengers: this.passengers,
        })
      }
    }
  }
}
</script>
<style scoped>
</style>