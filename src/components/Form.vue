<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      v-if="!submitted"
      lazy-validation
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="firstLetters"
              label="Voorletters"
              :autofocus="true"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Naam"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="address"
              label="Adres"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="zipCode"
              label="Postcode"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-text-field
              v-model="place"
              label="Plaats"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
          >
            <v-btn block
              @click="validate"
            >
              Boeken
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container v-if="submitted">
      <v-row>
        <v-col>
          <v-card
            class="mx-auto my-12"
            max-width="374"
          >
            <v-img
              height="250"
              src="https://images.pexels.com/photos/408503/pexels-photo-408503.jpeg?cs=srgb&dl=pexels-slondotpics-408503.jpg&fm=jpg"
            ></v-img>
            <v-card-text>
              <v-list-item v-if="getBooking" class="flex-column">
                <v-list-item-content v-for="(val, key) in getBooking" :key="key">
                  <v-list-item-subtitle>
                    <v-list-item-icon v-if="BookingIcons[key]">
                      <v-icon v-text="BookingIcons[key]"></v-icon>
                    </v-list-item-icon>
                    {{ val }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <template>
                <v-divider v-if="getBooking" class="mx-4"></v-divider>
                <v-list-item class="flex-column">
                  <v-list-item-content>
                    <v-list-item-subtitle v-if="name">
                      <template v-if="firstLetters">{{ firstLetters }} </template> {{ name }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle v-if="address" v-html="address"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle v-if="zipCode">
                      {{ zipCode }}
                      <template v-if="place">{{ place }}</template>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-content>
                    <v-list-item-subtitle v-if="email" v-html="email"></v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>  
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import BookingIcons from '@/bookingIcons'

export default {
  data: () => ({
    BookingIcons: BookingIcons,
    submitted: false,
    valid: true,
    firstLetters: '',
    address: '',
    zipCode: '',
    place: '',
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
  }),
  methods: {
    validate () {
      this.submitted = this.$refs.form.validate()
    }
  },
  computed: {
    ...mapState('booking', ['booking']),
    ...mapGetters('booking', ['getBooking'])
  }
}
</script>
<style lang="scss" scoped>
.v-card__text {
  text-align: left;
}
.v-list-item {
  min-height: auto; 
  &__content {
    align-self: flex-start;
  }
}
</style>